const {PrismaClient} = requires("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;