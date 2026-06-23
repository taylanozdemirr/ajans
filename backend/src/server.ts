import app from './app';
import { ENV } from './config/env';
import { prisma } from './config/db';
import bcrypt from 'bcryptjs';

async function bootstrap() {
  try {
    // Ensure default admin exists
    const admin = await prisma.user.findUnique({ where: { email: 'admin@ajans.com' } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: {
          email: 'admin@ajans.com',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      console.log('Default admin created: admin@ajans.com / admin123');
    }

    const demoCompany = await prisma.user.findUnique({ where: { email: 'firma@ajans.com' } });
    if (!demoCompany) {
      const hashedPassword = await bcrypt.hash('firma123', 10);
      await prisma.user.create({
        data: {
          email: 'firma@ajans.com',
          password: hashedPassword,
          role: 'COMPANY',
          company: {
            create: {
              name: 'Demo Ajans',
              totalLimit: 50,
              usedLimit: 0
            }
          }
        }
      });
      console.log('Demo company created: firma@ajans.com / firma123');
    }

    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

bootstrap();
