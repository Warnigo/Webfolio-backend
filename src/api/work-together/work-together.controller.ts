import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseInterceptors,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { WorkTogetherService } from './work-together.service';
import { ApiResponseInterceptor } from '@/interceptors';
import { CreateWorkTogetherDto } from './dto';
import { WorkTogether } from './entity';
import { ApiResponse } from '@/types';
import { ROUTES } from '@/constants';

@Controller(ROUTES.workTogether)
@UseInterceptors(ApiResponseInterceptor)
export class WorkTogetherController {
  constructor(private readonly workTogetherService: WorkTogetherService) {}

  @Post('add')
  async create(
    @Body() createWorkTogetherDto: CreateWorkTogetherDto,
  ): Promise<ApiResponse<WorkTogether>> {
    try {
      const data = await this.workTogetherService.create(createWorkTogetherDto);
      return {
        success: true,
        messages: ['Work together request created successfully'],
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          messages: ['Failed to create work together request'],
          error: { statusCode: HttpStatus.BAD_REQUEST, message: error.message },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(): Promise<ApiResponse<WorkTogether[]>> {
    try {
      const data = await this.workTogetherService.findAll();
      return {
        success: true,
        messages: ['Work together requests retrieved successfully'],
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          messages: ['Failed to retrieve work together requests'],
          error: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/done')
  async markAsDone(
    @Param('id') id: string,
  ): Promise<ApiResponse<WorkTogether>> {
    try {
      const data = await this.workTogetherService.markAsDone(+id);
      return {
        success: true,
        messages: ['Work together request marked as done successfully'],
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            success: false,
            messages: ['Work together request not found'],
            error: { statusCode: HttpStatus.NOT_FOUND, message: error.message },
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          success: false,
          messages: ['Failed to mark work together request as done'],
          error: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
