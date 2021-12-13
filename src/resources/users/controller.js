const prisma = require("../../utils/dbClient");

async function getProfile(req, res) {
    
  const { id } = req.body.id;
  console.log({ id });

  try {
    const profile = await prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        profile: true,
      },
    });

    res.status(200).json({ profile });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
}

async function validateProfile(req, res) {
  const id = req.user.id;

  const { date } = req.body;

  console.log({ id, test, body: req.body });

  try {
    const profile = await prisma.profile.create({
      data: {
        ...req.body,
        userId: req.user.id,
      },
    });

    res.status(200).json({ profile });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
}

module.exports = { getProfile, validateProfile };
