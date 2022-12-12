import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      googleId: process.env.GOOGLE_ID,
      avatarUrl: 'https://github.com/paulofelipebrito.png',
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'ABC123',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  const date = new Date();
  date.setDate(date.getDate() + 1);
  await prisma.game.create({
    data: {
      date: date.toISOString(),
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    },
  });

  date.setDate(date.getDate() + 1);
  await prisma.game.create({
    data: {
      date: date.toISOString(),
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main().catch(console.error);
