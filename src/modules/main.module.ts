import { Module } from '@nestjs/common';
import { QuestModule } from './quest/quest.module';

@Module({
  imports: [QuestModule],
})
export class MainModule {}
