/** Login (dev): hernanrossi97@gmail.com / Merli6435 (bcrypt, cost 10). Rol admin: turnos/clientes exigen admin en la API. */
export const SEED_TEST_USER = {
  email: 'hernanrossi97@gmail.com',
  password:
    '$2b$10$xHmQnmfJnD43JsCgVGNtNOrN8RhZXcjT8kZ4G0YTvKzHj5xHhBR2S',
  fullName: 'Hernan Rossi',
  roles: ['admin'],
} as const;

type SeedClient = {
  name: string;
  surname: string;
  age?: number;
  phone?: string;
  planAmount: number;
};

type SeedPayment = {
  month: number;
  year: number;
  amount: number;
  isPaid: boolean;
  paymentDate?: Date;
  clientIndex: number;
};

function splitNameAndSurname(full: string): Pick<SeedClient, 'name' | 'surname'> {
  const value = full.trim().replace(/\s+/g, ' ');
  const lastSpace = value.lastIndexOf(' ');
  if (lastSpace === -1) return { name: value, surname: 'SinApellido' };
  return {
    name: value.slice(0, lastSpace).trim(),
    surname: value.slice(lastSpace + 1).trim() || 'SinApellido',
  };
}

// Seed real: clientes + 1 deuda impaga en mayo.
const CLIENTS_60K = [
  'Nati M.',
  'Mariana A.',
  'Miguel S.',
  'Benito P.',
  'Balti S.',
  'Lichi P.',
  'Thiago H.',
  'Benicio G.',
  'Carlos N.',
  'Bauti C.',
  'Antonella',
  'Laura R.',
  'Nachi B.',
  'Sole Pastorutti',
] as const;

const CLIENTS_30K = [
  'Esteban',
  'Salvador',
  'Matias T.',
  'Emilio',
  'Martino',
  'Carlos B.',
  'Luciana M.',
  'Hernan A.',
  'Valen A.',
  'Lucas V.',
  'Luca S.',
  'Manu V.',
  'Ciro R.',
  'Ramiro',
  'Antonio',
  'Lorenzo RE',
  'Franco V.',
  'Renzo S.',
  'Pablo',
  'Dante B.',
  'Giuli',
  'Pancho',
  'Negro Alvarez',
  'Marcelo',
  'Guido',
  'Vicente',
  'Bruno',
  'Dante G.',
  'Andres S.',
  'Castillo T.',
  'Castillo D.',
  'Polli',
  'Pachu',
  'Juan Caba',
  'Vittorio V',
  'Maximo C',
  'Bauti Maldonado',
  'Luchi cicarelli',
  'Nino Basso',
] as const;

function buildInitialData() {
  const clients: SeedClient[] = [
    ...CLIENTS_60K.map((full) => ({
      ...splitNameAndSurname(full),
      planAmount: 60000,
    })),
    ...CLIENTS_30K.map((full) => ({
      ...splitNameAndSurname(full),
      planAmount: 30000,
    })),
  ];

  const now = new Date();
  const year = now.getFullYear();
  const month = 5; // mayo

  const payments: SeedPayment[] = clients.map((client, clientIndex) => ({
    month,
    year,
    amount: client.planAmount,
    isPaid: false,
    clientIndex,
  }));

  return { clients, payments };
}

export const INITIAL_DATA = buildInitialData();
