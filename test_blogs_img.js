const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blogs = await prisma.blogs.findMany({
    select: { id: true, title: true, featured_image: true },
    take: 3,
    orderBy: { created_at: "desc" }
  });
  console.log(blogs);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
