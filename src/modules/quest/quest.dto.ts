import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { Quest } from 'src/entity/Quest';

export class CreateQuestRequest {
  @ApiPropertyOptional()
  @IsDefined()
  @IsString()
  readonly name: string;
}

export class UpdateQuestRequest {
  @ApiPropertyOptional()
  @IsDefined()
  @IsString()
  readonly name: string;
}

export class QuestResponse {
  @ApiProperty() readonly id: number;

  @ApiProperty() readonly name: string;

  constructor(quest: Quest) {
    this.id = quest.id!;
    this.name = quest.name;
  }
}

export class QuestDto {
  readonly id: number;
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class QuestsResponse {
  @ApiProperty({ type: QuestResponse, isArray: true })
  readonly items!: QuestResponse[];
}
