type SeedClient = {
  name: string;
  surname: string;
  age?: number;
  phone?: string;
};

type SeedPayment = {
  month: number;
  year: number;
  amount: number;
  isPaid: boolean;
  paymentDate?: Date;
  clientIndex: number;
};

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function randomFrom<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

function buildInitialData() {
  const names = [
    'Maximiliano',
    'Natalia',
    'Juan',
    'Sofia',
    'Martina',
    'Mateo',
    'Valentina',
    'Lucas',
    'Camila',
    'Benjamin',
    'Mia',
    'Thiago',
    'Emma',
    'Joaquin',
    'Catalina',
    'Tomas',
    'Renata',
    'Felipe',
    'Julieta',
    'Bruno',
  ];
  const surnames = [
    'Cappelletti',
    'Magallanes',
    'Gonzalez',
    'Rodriguez',
    'Fernandez',
    'Lopez',
    'Martinez',
    'Perez',
    'Garcia',
    'Sanchez',
    'Romero',
    'Diaz',
    'Alvarez',
    'Torres',
    'Ruiz',
  ];

  const CLIENTS_COUNT = 35;
  const clients: SeedClient[] = Array.from({ length: CLIENTS_COUNT }, (_, idx) => ({
    name: randomFrom(names, idx),
    surname: randomFrom(surnames, idx * 3 + 1),
    age: 18 + (idx % 45),
    phone: `11${pad2((idx % 90) + 10)}${pad2((idx % 90) + 10)}${pad2(
      (idx % 90) + 10,
    )}${pad2((idx % 90) + 10)}`,
  }));

  const payments: SeedPayment[] = [];

  // Muchos pagos impagos para forzar paginación en el dashboard de deudas.
  // Con 35 clientes * 4 impagos = 140 rows -> con limit=10 da 14 páginas.
  const UNPAID_PER_CLIENT = 4;
  const BASE_YEAR = 2026;

  for (let clientIndex = 0; clientIndex < CLIENTS_COUNT; clientIndex++) {
    const baseAmount = 12000 + (clientIndex % 8) * 1500;

    // 1 pago pagado (para no dejar todo impago)
    payments.push({
      month: 1,
      year: BASE_YEAR,
      amount: baseAmount,
      isPaid: true,
      paymentDate: new Date(BASE_YEAR, 0, 5 + (clientIndex % 20)),
      clientIndex,
    });

    for (let k = 0; k < UNPAID_PER_CLIENT; k++) {
      const month = 2 + ((clientIndex + k) % 12);
      const year = BASE_YEAR + Math.floor((clientIndex + k) / 12);
      payments.push({
        month,
        year,
        amount: baseAmount + k * 500,
        isPaid: false,
        clientIndex,
      });
    }
  }

  return { clients, payments };
}

export const INITIAL_DATA = buildInitialData();
