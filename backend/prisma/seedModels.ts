import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const firstNames = ['Aleyna', 'Can', 'Ece', 'Burak', 'Merve', 'Kaan', 'Selin', 'Emre', 'Buse', 'Deniz', 'Gizem', 'Cem', 'Aslı', 'Oğuz', 'Zeynep'];
const photos = ['/uploads/model_1.png', '/uploads/model_2.png', '/uploads/model_3.png', '/uploads/model_4.png'];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  const companyUser = await prisma.user.findUnique({
    where: { email: 'firma@ajans.com' },
    include: { company: true }
  });

  if (!companyUser || !companyUser.company) {
    console.log('firma@ajans.com (Demo Ajans) bulunamadı. Lütfen önce backend i bir kez başlatın.');
    return;
  }

  const companyId = companyUser.company.id;

  console.log('Eski mankenler temizleniyor...');
  await prisma.model.deleteMany({ where: { companyId } });

  console.log('35 yeni manken oluşturuluyor...');
  
  const modelsData = [];
  for (let i = 0; i < 35; i++) {
    await prisma.model.create({
      data: {
        companyId,
        firstName: randomChoice(firstNames),
        whatsappPhone: `90555${randomInt(1000000, 9999999)}`,
        photos: {
          create: [
            { url: '/uploads/model_2.png' },
            { url: '/uploads/model_3.png' }
          ]
        }
      }
    });
  }

  await prisma.company.update({
    where: { id: companyId },
    data: { usedLimit: 35 }
  });

  console.log('Mankenler başarıyla oluşturuldu!');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
