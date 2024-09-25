import { WorkTogetherModule } from '@/api/work-together'
import { config } from '@/config'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
        migrationsRun: true,
        synchronize: false,
      }),
    }),
    WorkTogetherModule,
  ],
})
export class AppModule {}
