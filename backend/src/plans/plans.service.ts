import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { Client } from 'src/clients/entities/client.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService implements OnModuleInit {
  private readonly logger = new Logger(PlansService.name);

  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async onModuleInit() {
    await this.ensureDefaultPlans();
  }

  async ensureDefaultPlans() {
    const count = await this.planRepository.count();
    if (count === 0) {
      this.logger.log('Inicializando planes por defecto...');
      const defaultPlans = [
        {
          name: 'Plan Básico',
          code: 'basico',
          price: 25000,
          description: 'Acceso estándar de entrenamiento',
        },
        {
          name: 'Plan Pro',
          code: 'pro',
          price: 50000,
          description: 'Acceso completo con seguimiento',
        },
      ];

      await this.planRepository.save(defaultPlans);
      this.logger.log('Planes por defecto creados con éxito.');
    }
  }

  async findAll() {
    const plans = await this.planRepository.find({
      order: { id: 'ASC' },
    });

    const clients = await this.clientRepository.find({
      select: ['id', 'planAmount'],
    });

    // Calcular cuántos clientes tienen asignado cada valor de plan
    const plansWithStats = plans.map((plan) => {
      const clientCount = clients.filter(
        (client) => client.planAmount === plan.price,
      ).length;

      return {
        ...plan,
        clientCount,
      };
    });

    return plansWithStats;
  }

  async findOne(id: number) {
    const plan = await this.planRepository.findOneBy({ id });
    if (!plan) {
      throw new NotFoundException(`El plan con ID ${id} no existe`);
    }
    return plan;
  }

  async create(createPlanDto: CreatePlanDto) {
    const plan = this.planRepository.create(createPlanDto);
    return await this.planRepository.save(plan);
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    const plan = await this.findOne(id);
    const oldPrice = plan.price;

    const { updateExistingClients = true, ...planFields } = updatePlanDto;

    Object.assign(plan, planFields);
    const savedPlan = await this.planRepository.save(plan);

    let updatedClientsCount = 0;

    // Si se actualizó el precio y está habilitada la sincronización
    if (
      updatePlanDto.price !== undefined &&
      updatePlanDto.price !== oldPrice &&
      updateExistingClients
    ) {
      const result = await this.clientRepository
        .createQueryBuilder()
        .update(Client)
        .set({ planAmount: updatePlanDto.price })
        .where('planAmount = :oldPrice', { oldPrice })
        .execute();

      updatedClientsCount = result.affected ?? 0;
      this.logger.log(
        `Se actualizaron ${updatedClientsCount} clientes de $${oldPrice} a $${updatePlanDto.price}`,
      );
    }

    return {
      ...savedPlan,
      updatedClientsCount,
    };
  }
}
