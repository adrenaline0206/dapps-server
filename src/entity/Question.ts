import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Room } from './Room';

@Entity()
export class Question {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: '質問ID',
  })
  public id: string;

  @Column('bigint', {
    name: 'room_id',
    unsigned: true,
    nullable: false,
    comment: 'ルームID',
  })
  roomId: string;

  @Column('bigint', {
    name: 'gest_id',
    unsigned: true,
    default: null,
    comment: '投稿者ID',
  })
  gestId: string | null = null;

  @Column('varchar', {
    name: 'address',
    length: '255',
    nullable: false,
    comment: '投稿者Ethereumアドレス',
  })
  address: string;

  @Column('text', {
    name: 'body',
    default: null,
    comment: '質問内容',
  })
  body: string | null = null;

  @Column('tinyint', {
    name: 'adoption',
    width: 1,
    default: 0,
    comment: '採用フラグ',
  })
  adopted: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
    comment: '作成日',
  })
  readonly createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
    comment: '更新日',
  })
  @ManyToOne(
    type => Room,
    rooms => rooms.questions,
  )
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  readonly rooms?: Room;
  readonly updatedAt?: Date;

  constructor(
    roomId: string,
    address: string,
    gestId: string | null,
    body: string | null,
    adopted: boolean,
  ) {
    this.roomId = roomId;
    this.address = address;
    this.gestId = gestId;
    this.body = body;
    this.adopted = adopted;
  }
}
