const prisma = require("../../utils/dbClient");

async function getAssets(req, res) {
  try {
    const assets = await prisma.trade.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const userAssets = assets.filter(
      (asset) => asset.type === "BUY" && asset.quantity > 0
    );

    res.status(200).json({ userAssets });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
}

function aggregate(trades) {

  const result = {};

  for (let i = 0; i < trades.length; i++) {
    const trade = trades[i]

    const { assetSymbol, quantity, type, price } = trade;

    if (!result[assetSymbol]) { // if not found, create it
        result[assetSymbol] = { // only adding one of a kind assetSymbol trade
          assetSymbol,
          quantity: quantity,
          price: price
        };
      continue;
    }

    const {quantity : prevQuantity} = result[assetSymbol]
    const {price : prevPrice} = result[assetSymbol]

    if(type === "SELL") { // if found one type of SELL

      const updatedQuantity = prevQuantity - quantity; 
      let avgPrice = (prevPrice * prevQuantity - price * quantity) / (prevQuantity - quantity)
      if( updatedQuantity == 0) { // if the quant == 0 && price == Infinity/NaN also, crashes the app on the front end also interfering with the price.toFixed()
        delete result[assetSymbol] // reseting the object by deleting it once the condition==ture 
        
        continue;
      }

      result[assetSymbol] ={ 
        assetSymbol,
        quantity : updatedQuantity, // subtract quant and price
        price: avgPrice
      }
      continue;
    }

    if (type === "BUY") {

      const updatedQuantity = prevQuantity + quantity;
      const avgPrice = (prevPrice * prevQuantity + price * quantity) / (prevQuantity + quantity)

      result[assetSymbol] ={
        assetSymbol,
        quantity: updatedQuantity, // add quant and price
        price: avgPrice
      } 
    }

  }

  const filteredTrades = Object.values(result);

  return filteredTrades;
}

async function aggregateTrades(req, res) {

  try {
    const assets = await prisma.trade.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const data = aggregate(assets); 

    const portofolio = data.filter(asset => asset.quantity > 0)

    res.status(200).json({ portofolio });
  } catch (error) {
    console.error({ error });
  }
}

async function tradeAssets(req, res) { // TODO make this a transaction /trade

  const { assetSymbol, price, type } = req.body;

  const quantity = parseInt(req.body.quantity);

  try {
    let asset = await prisma.trade.create({
      data: {
        assetSymbol,
        price,
        quantity,
        type,
        userId: req.user.id,
      },
    });

    res.status(200).json({ asset });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
}

module.exports = { tradeAssets, getAssets, aggregateTrades };
