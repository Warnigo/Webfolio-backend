import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkTogetherController } from './work-together.controller';
import { WorkTogetherService } from './work-together.service';
import { WorkTogether } from './entity/work-together.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkTogether])],
  controllers: [WorkTogetherController],
  providers: [WorkTogetherService],
})
export class WorkTogetherModule {}
