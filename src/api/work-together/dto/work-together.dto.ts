import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateWorkTogetherDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'google',
    required: true,
  })
  company: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'hello@google.com',
    required: true,
  })
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '+46 883 8899 33',
    required: true,
  })
  phone: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '$3000',
    required: true,
  })
  budget: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'offer about, message for me',
    required: true,
  })
  message: string
}
