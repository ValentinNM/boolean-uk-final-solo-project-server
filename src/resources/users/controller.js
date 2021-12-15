const prisma = require("../../utils/dbClient");

async function getProfile(req, res) {
    
  console.log({ id : req.user.id });

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: req.user.id,
      }
    });

    res.status(200).json({ profile });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
}

async function validateProfile(req, res) {
  const id = req.user.id;

  let body = req.body;
  
  let { dob  } = req.body;

  dob = new Date(dob).toISOString();

  body.dob = dob;

  console.log({ id, dob, body});

  try {
    const profile = await prisma.user.update({
      where : { 
        id : req.user.id
      },
      data : { 
        profile : { 
          upsert : { 
            create : { 
              ...body,
            },
            update : { 
              ...body,
            }
          }
        }
      },
      include : { 
        profile : true
      }
    })

    console.log({ profile });
    res.status(200).json({ profile });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
}

async function editProfile(req, res) { 

  console.log({ id: req.user.id, body: req.body })

  try {

    const updatedProfile = await prisma.profile.update({ 
      where : { 
        id : req.body.id
      },
      data : { 
        ...req.body
      }
    })

    console.log({updatedProfile})

    res.status(200).json({updatedProfile})

  } catch (error) {
    console.error(error)

    res.status(500).json({error : error.message})
  }

}


module.exports = { getProfile, validateProfile, editProfile };
