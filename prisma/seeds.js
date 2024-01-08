const { PrismaClient } = require("@prisma/client");
const { users, menus } = require("./data.js");

const prisma = new PrismaClient();

const load = async () => {
  try {
    const totalMenu = await prisma.menu.count();
    const totalUser = await prisma.users.count();

    if (totalMenu !== 0) {
      // delete
      await prisma.menu.deleteMany();
      console.log("Deleted records in menus table");
    }

    if (totalUser !== 0) {
      // delete
      await prisma.user.deleteMany();
      console.log("Deleted records in users table");
    }

    // create
    await prisma.menu.createMany({
      data: menus,
    });
    console.log("Added menus data");

    await prisma.users.createMany({
      data: users,
    });
    console.log("Added users data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
