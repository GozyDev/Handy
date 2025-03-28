import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users:", users);
}

main()
  .catch((error) => console.error(error))
  .finally(() => prisma.$disconnect());
