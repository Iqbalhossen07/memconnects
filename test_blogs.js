const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SHOW DATABASES;`;
  console.log(result);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
