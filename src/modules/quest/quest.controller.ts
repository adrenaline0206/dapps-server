import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { QuestService } from './quest.service';
import {
  QuestResponse,
  CreateQuestRequest,
  QuestsResponse,
  UpdateQuestRequest,
} from './quest.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: QuestsResponse })
  async getAllQuests(): Promise<QuestResponse[]> {
    return await this.questService.findAll();
  }

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: QuestsResponse })
  async addQuest(@Body() body: CreateQuestRequest): Promise<QuestResponse> {
    const quest = await this.questService.create(body);

    return new QuestResponse(quest);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: QuestsResponse })
  async updateQuest(
    @Param('id') id: number,
    @Body() body: UpdateQuestRequest,
  ): Promise<QuestResponse> {
    const quest = await this.questService.update(id, body);

    return new QuestResponse(quest);
  }

  @Delete(':id')
  async deleteQuest(@Param('id') id: number) {
    await this.questService.delete(id);
  }
}
