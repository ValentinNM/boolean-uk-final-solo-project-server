const prisma = require("../../utils/dbClient");

async function getProfile(req, res) {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json({ profile });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
}

async function validateProfile(req, res) {
  let body = req.body;

  let { dob } = req.body;

  dob = new Date(dob).toISOString();

  body.dob = dob;

  try {
    const profile = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        profile: {
          upsert: {
            create: {
              ...body,
            },
            update: {
              ...body,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    res.status(200).json({ profile });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
}

async function editProfile(req, res) {
  try {
    const updatedProfile = await prisma.profile.update({
      where: {
        id: req.body.id,
      },
      data: {
        ...req.body,
      },
    });

    res.status(200).json({ updatedProfile });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
}

module.exports = { getProfile, validateProfile, editProfile };
