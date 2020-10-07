import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Quest {
  @PrimaryGeneratedColumn({
    name: 'quest_id',
    type: 'bigint',
    unsigned: true,
    comment: '顧客ID',
  })
  public id: number;

  @Column('varchar', {
    name: 'name',
    length: '255',
    nullable: false,
    comment: '名前',
  })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
