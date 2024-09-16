import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkTogether } from './entity';
import { CreateWorkTogetherDto } from './dto';

@Injectable()
export class WorkTogetherService {
  constructor(
    @InjectRepository(WorkTogether)
    private workTogetherRepository: Repository<WorkTogether>,
  ) {}

  async create(
    createWorkTogetherDto: CreateWorkTogetherDto,
  ): Promise<WorkTogether> {
    const workTogether = this.workTogetherRepository.create(
      createWorkTogetherDto,
    );
    return await this.workTogetherRepository.save(workTogether);
  }

  async findAll(): Promise<WorkTogether[]> {
    return await this.workTogetherRepository.find();
  }

  async markAsDone(id: number): Promise<WorkTogether> {
    const workTogether = await this.workTogetherRepository.findOne({
      where: { id },
    });
    if (!workTogether) {
      throw new NotFoundException(`WorkTogether with ID ${id} not found`);
    }
    workTogether.isDone = true;
    return await this.workTogetherRepository.save(workTogether);
  }
}
