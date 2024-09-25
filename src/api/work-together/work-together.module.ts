import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WorkTogether } from './entity/work-together.entity'
import { WorkTogetherController } from './work-together.controller'
import { WorkTogetherService } from './work-together.service'

@Module({
  imports: [TypeOrmModule.forFeature([WorkTogether])],
  controllers: [WorkTogetherController],
  providers: [WorkTogetherService],
})
export class WorkTogetherModule {}
