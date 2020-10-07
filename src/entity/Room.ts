import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Question } from './Question';

@Entity()
export class Room {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'ルームID',
  })
  readonly id?: string;

  @Index('event_code_UNIQUE', { unique: true })
  @Column('varchar', {
    name: 'event_code',
    length: '255',
    nullable: false,
    comment: 'イベントコード',
  })
  eventCode: string;

  @Column('bigint', {
    name: 'owner_id',
    unsigned: true,
    nullable: false,
    comment: 'ルーム作成者ID',
  })
  ownerId: string;

  @Column('varchar', {
    name: 'owner_address',
    length: '255',
    default: null,
    comment: 'オーナーアドレス',
  })
  ownerAddress: string | null = null;

  @Column('varchar', {
    name: 'address',
    length: '255',
    default: null,
    comment: 'コンテナアドレス',
  })
  address: string | null = null;

  @Column('varchar', {
    name: 'create_tx_hash',
    length: '255',
    default: null,
    comment: 'ルームを作成した際のトランザクション',
  })
  createTxHash: string | null = null;

  @Column('varchar', {
    name: 'title',
    length: '255',
    default: null,
    comment: 'タイトル',
  })
  title: string | null = null;

  @Column('text', {
    name: 'description',
    default: null,
    comment: 'description',
  })
  description: string | null = null;

  @Column('bigint', {
    name: 'wei_balance',
    unsigned: true,
    default: 0,
    comment: 'クリプト残高',
  })
  weiBalance: string;

  @Column('bigint', {
    name: 'wei_prize',
    unsigned: true,
    default: 0,
    comment: '報酬',
  })
  weiPrize: string;

  @Column('datetime', {
    name: 'start_time',
    default: null,
    comment: '開始日',
  })
  startTime: Date | null = null;

  @Column('datetime', {
    name: 'end_time',
    default: null,
    comment: '終了日',
  })
  endTime: Date | null = null;

  @Column('tinyint', {
    name: 'active',
    width: 1,
    default: 1,
    comment: 'アクティブフラグ',
  })
  active: boolean;

  @Column('tinyint', {
    name: 'is_Private',
    width: 1,
    default: 0,
    comment: '非公開フラグ',
  })
  isPrivate: boolean;

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
  readonly updatedAt?: Date;

  @ManyToOne(
    type => User,
    user => user.rooms,
  )
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  readonly user?: User;

  @OneToMany(
    type => Question,
    questions => questions.rooms,
  )
  readonly questions: Question;

  constructor(
    ownerId: string,
    ownerAddress: string | null,
    title: string | null,
    description: string | null,
    eventCode: string,
    address: string | null,
    createTxHash: string | null,
    isPrivate: boolean,
    weiPrize: string,
    startTime: Date | null,
    endTime: Date | null,
  ) {
    (this.ownerId = ownerId),
      (this.ownerAddress = ownerAddress),
      (this.title = title),
      (this.description = description),
      (this.eventCode = eventCode),
      (this.address = address),
      (this.createTxHash = createTxHash),
      (this.isPrivate = isPrivate),
      (this.weiPrize = weiPrize),
      (this.startTime = startTime),
      (this.endTime = endTime);
  }
}
