import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from 'src/entity/Quest';

@Module({
  imports: [TypeOrmModule.forFeature([Quest])],
  providers: [QuestService],
  controllers: [QuestController],
})
export class QuestModule {}
