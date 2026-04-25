import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = (pw: string) => bcrypt.hashSync(pw, 10);

  // Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@learnstack.io' },
    update: {},
    create: {
      email: 'admin@learnstack.io',
      name: 'Admin',
      role: Role.ADMIN,
      passwordHash: hash('Admin1234!'),
    },
  });

  const learners = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@learnstack.io' },
      update: {},
      create: {
        email: 'alice@learnstack.io',
        name: 'Alice Chen',
        role: Role.LEARNER,
        passwordHash: hash('Password1!'),
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@learnstack.io' },
      update: {},
      create: {
        email: 'bob@learnstack.io',
        name: 'Bob Patel',
        role: Role.LEARNER,
        passwordHash: hash('Password1!'),
      },
    }),
    prisma.user.upsert({
      where: { email: 'charlie@learnstack.io' },
      update: {},
      create: {
        email: 'charlie@learnstack.io',
        name: 'Charlie Kim',
        role: Role.LEARNER,
        passwordHash: hash('Password1!'),
      },
    }),
  ]);

  // Track
  const track = await prisma.track.upsert({
    where: { slug: 'qa-fundamentals' },
    update: {},
    create: {
      slug: 'qa-fundamentals',
      title: 'QA Fundamentals',
    },
  });

  // Enroll all learners
  for (const learner of learners) {
    await prisma.enrollment.upsert({
      where: { userId_trackId: { userId: learner.id, trackId: track.id } },
      update: {},
      create: { userId: learner.id, trackId: track.id },
    });
  }

  console.log('Seed complete.');
  console.log(`  Admin:    admin@learnstack.io / Admin1234!`);
  console.log(`  Learners: alice / bob / charlie @learnstack.io / Password1!`);
  console.log(`  Track:    ${track.slug}`);
  console.log(`  Enrollments: ${learners.length}`);
  console.log(`  Users total: ${1 + learners.length} (admin + ${learners.length} learners)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
