import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateWorkTogetherDto } from './dto'
import { WorkTogether } from './entity'
import { Repository } from 'typeorm'

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
    )
    return await this.workTogetherRepository.save(workTogether)
  }

  async findAll(): Promise<WorkTogether[]> {
    return await this.workTogetherRepository.find()
  }

  async markAsDone(id: number): Promise<WorkTogether> {
    const workTogether = await this.workTogetherRepository.findOne({
      where: { id },
    })
    if (!workTogether) {
      throw new NotFoundException(`WorkTogether with ID ${id} not found`)
    }
    workTogether.isDone = true
    return await this.workTogetherRepository.save(workTogether)
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.workTogetherRepository.delete({ id })
    if (result.affected === 0) {
      throw new NotFoundException(`WorkTogether with ID ${id} not found`)
    }
  }

  async deleteAll(): Promise<void> {
    await this.workTogetherRepository.clear()
  }
}
