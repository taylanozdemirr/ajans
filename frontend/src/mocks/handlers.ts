import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('http://localhost:5000/api/auth/login', async ({ request }) => {
    const { email, password }: any = await request.json();
    
    if (email === 'admin@ajans.com' && password === 'admin123') {
      return HttpResponse.json({
        token: 'mock-admin-token-12345',
        user: { id: '1', email, role: 'ADMIN', company: null }
      });
    }

    if (email === 'firma@ajans.com' && password === 'firma123') {
      return HttpResponse.json({
        token: 'mock-company-token-12345',
        user: { 
          id: '2', 
          email, 
          role: 'COMPANY', 
          company: { id: 'c1', name: 'Mock Ajans', totalLimit: 10, usedLimit: 2 }
        }
      });
    }

    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }),

  http.get('http://localhost:5000/api/public/models', () => {
    const mockModels = [
      {
        id: 'm1',
        firstName: 'Alice',
        lastName: 'Doe',
        height: 175,
        weight: 55,
        age: 22,
        city: 'Istanbul',
        whatsappPhone: '905550001122',
        photos: [{ id: 'p1', url: '/uploads/model_2.png' }],
        company: { id: 'c1', name: 'Mock Ajans' }
      },
      {
        id: 'm2',
        firstName: 'Bella',
        lastName: 'Smith',
        height: 178,
        weight: 58,
        age: 24,
        city: 'Izmir',
        whatsappPhone: '905550001133',
        photos: [{ id: 'p2', url: '/uploads/model_3.png' }],
        company: { id: 'c2', name: 'VIP Models' }
      }
    ];

    // Fisher-Yates Shuffle for mock
    for (let i = mockModels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mockModels[i], mockModels[j]] = [mockModels[j], mockModels[i]];
    }

    return HttpResponse.json({
      data: mockModels,
      pagination: { total: mockModels.length, page: 1, limit: 20, totalPages: 1 }
    });
  }),
];
