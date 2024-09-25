import { API_TAGS, ROUTES } from '@/constants'
import { ApiResponseInterceptor } from '@/interceptors'
import { ApiResponse } from '@/types'
import { handleHttpError } from '@/utils/error-handler'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger'

import { WORK_TOGETHER_MESSAGES } from './constants'
import { CreateWorkTogetherDto } from './dto'
import { WorkTogether } from './entity'
import { WorkTogetherService } from './work-together.service'

@ApiTags(API_TAGS.workTogether)
@Controller(ROUTES.workTogether)
@UseInterceptors(ApiResponseInterceptor)
export class WorkTogetherController {
  constructor(private readonly workTogetherService: WorkTogetherService) {}

  @Get()
  @SwaggerApiResponse({
    status: 200,
    description: WORK_TOGETHER_MESSAGES.WORK_TOGETHER_REQUESTS_RETRIEVED,
  })
  async find(): Promise<ApiResponse<WorkTogether[]>> {
    try {
      const data = await this.workTogetherService.findAll()
      return {
        success: true,
        messages: ['Work together requests retrieved successfully'],
        data,
      }
    } catch (error) {
      throw handleHttpError(error, 'Failed to retrieve work together requests')
    }
  }

  @Post('add')
  @SwaggerApiResponse({
    status: 201,
    description: WORK_TOGETHER_MESSAGES.WORK_TOGETHER_REQUEST_CREATED,
  })
  async create(
    @Body() createWorkTogetherDto: CreateWorkTogetherDto,
  ): Promise<ApiResponse<WorkTogether>> {
    try {
      const data = await this.workTogetherService.create(createWorkTogetherDto)
      return {
        success: true,
        messages: ['Work together request created successfully'],
        data,
      }
    } catch (error) {
      throw handleHttpError(
        error,
        'Failed to create work together request',
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  @Put(':id/done')
  @SwaggerApiResponse({
    status: 200,
    description: WORK_TOGETHER_MESSAGES.WORK_TOGETHER_REQUEST_MARKED_DONE,
  })
  async markAsDone(
    @Param('id') id: string,
  ): Promise<ApiResponse<WorkTogether>> {
    try {
      const data = await this.workTogetherService.markAsDone(+id)
      return {
        success: true,
        messages: ['Work together request marked as done successfully'],
        data,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw handleHttpError(
          error,
          'Work together request not found',
          HttpStatus.NOT_FOUND,
        )
      }
      throw handleHttpError(
        error,
        'Failed to mark work together request as done',
      )
    }
  }

  @Delete(':id')
  @SwaggerApiResponse({
    status: 200,
    description: WORK_TOGETHER_MESSAGES.WORK_TOGETHER_REQUEST_DELETED,
  })
  async deleteById(@Param('id') id: string): Promise<ApiResponse<null>> {
    try {
      await this.workTogetherService.deleteById(+id)
      return {
        success: true,
        messages: ['Work together request deleted successfully'],
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw handleHttpError(
          error,
          `Work together request with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        )
      }
      throw handleHttpError(error, 'Failed to delete work together request')
    }
  }

  @Delete()
  @SwaggerApiResponse({
    status: 200,
    description: WORK_TOGETHER_MESSAGES.WORK_TOGETHER_REQUESTS_DELETED,
  })
  async deleteAll(): Promise<ApiResponse<null>> {
    try {
      await this.workTogetherService.deleteAll()
      return {
        success: true,
        messages: ['All work together requests deleted successfully'],
      }
    } catch (error) {
      throw handleHttpError(
        error,
        'Failed to delete all work together requests',
      )
    }
  }
}
