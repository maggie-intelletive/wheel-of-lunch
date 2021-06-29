import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { resolve } from 'path';
import { ResselectionsController } from './resselections/resselections.controller';
import { ResselectionsService } from './resselections/reselections.service';
import { ResselectionsDao } from './resselections/resselections.dao';
import { DatabaseService } from './shared/database.service';
import { PastordersController } from './pastorders/pastorders.controller';
import { PastordersService } from './pastorders/pastorders.service';
import { PastordersDao } from './pastorders/pastorders.dao';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{tx,js}')),
  ],
  controllers: [ResselectionsController, PastordersController],
  providers: [
    ResselectionsService,
    ResselectionsDao,
    PastordersService,
    PastordersDao,
    DatabaseService,
  ],
})
export class AppModule {}
