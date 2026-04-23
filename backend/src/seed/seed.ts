/** Login: hernanrossi97@gmail.com / Merli6435 (bcrypt, cost 10). Rol admin: turnos/clientes exigen admin en la API. */
export const SEED_TEST_USER = {
  email: 'hernanrossi97@gmail.com',
  password:
    '$2b$10$5cjoSaA.8hBKCHEY7hhYGeh2FOH0ovwIqvAru.OjHLkU6/9aFoda2',
  fullName: 'Hernan Rossi',
  roles: ['admin'],
} as const;

const SEED_PLAN_AMOUNTS = [25000, 50000] as const;

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
    planAmount: SEED_PLAN_AMOUNTS[idx % SEED_PLAN_AMOUNTS.length],
  }));

  const payments: SeedPayment[] = [];

  // --- Pagos / deudas ---------------------------------------------------------
  // Monto guardado en cada fila = plan del cliente ($25.000 o $50.000), igual
  // que cuando el cron crea la deuda mensual (client.planAmount).
  //
  // El recargo por "día del mes" (día 1–14: base, 15–21: +10%, 22 en adelante: +15%)
  // lo calcula el backend al listar cobros; acá solo sembramos el monto base del plan.
  //
  // Muchos impagos para paginar el dashboard: 35 clientes × 4 = 140 filas (~14 páginas con limit 10).
  const UNPAID_PER_CLIENT = 4;
  const BASE_YEAR = 2026;

  for (let clientIndex = 0; clientIndex < CLIENTS_COUNT; clientIndex++) {
    // Mismo cliente → mismo plan en todos sus pagos del seed
    const planAmount = clients[clientIndex].planAmount;

    // Un mes ya pagado (historial); el monto es el del plan, no montos viejos fijos
    payments.push({
      month: 1,
      year: BASE_YEAR,
      amount: planAmount,
      isPaid: true,
      paymentDate: new Date(BASE_YEAR, 0, Math.min(25, 5 + (clientIndex % 20))),
      clientIndex,
    });

    // Cuotas impagas: avanzamos mes a mes (1–12) y año, sin saltar a "mes 13"
    let mes = 2 + (clientIndex % 7); // cada cliente arranca en un mes distinto (feb–ago)
    let anio = BASE_YEAR;

    for (let k = 0; k < UNPAID_PER_CLIENT; k++) {
      payments.push({
        month: mes,
        year: anio,
        amount: planAmount,
        isPaid: false,
        clientIndex,
      });

      mes += 1;
      if (mes > 12) {
        mes = 1;
        anio += 1;
      }
    }
  }

  return { clients, payments };
}

export const INITIAL_DATA = buildInitialData();
