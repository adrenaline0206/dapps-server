import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestRequest, UpdateQuestRequest, QuestDto } from './quest.dto';
import { Quest } from '../../entity/Quest';

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
  ) {}

  // 読み取り
  async findAll(): Promise<Quest[]> {
    const quest = await this.questRepository.find();
    if (quest === undefined) {
      throw new Error('Transaction repository does not exist');
    }

    return quest;
  }

  // 生成
  async create(dto: CreateQuestRequest): Promise<Quest> {
    const quest = new QuestDto(dto.name);

    return await this.questRepository.save(quest);
  }

  // 更新
  async update(id: number, dto: UpdateQuestRequest): Promise<Quest> {
    const quest = await this.questRepository.findOne(id);
    if (quest === undefined) {
      throw new Error('Transaction repository does not exist');
    }

    quest.name = dto.name;

    await this.questRepository.save(quest);

    return this.questRepository.findOneOrFail(id);
  }

  // 削除
  async delete(id: number): Promise<void> {
    await this.questRepository.delete(id);
  }
}
