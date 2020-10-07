import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Deposit {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: '預託金ID',
  })
  public id: string;

  @Column('bigint', {
    name: 'tx_hash',
    unsigned: true,
    default: null,
    comment: 'トランザクションハッシュ',
  })
  txHash: string | null = null;

  @Column('varchar', {
    name: 'sender',
    length: '255',
    nullable: false,
    default: '0x0',
    comment: '送信者アドレス',
  })
  sender: string;

  @Column('varchar', {
    name: 'receiver',
    length: '255',
    nullable: false,
    default: '0x0',
    comment: '受信者アドレス',
  })
  receiver: string;

  @Column('bigint', {
    name: 'wei_amount',
    unsigned: true,
    nullable: false,
    default: 0,
    comment: '送金額',
  })
  weiAmount: string;

  @Column('tinyint', {
    name: 'success',
    width: 1,
    default: 0,
    comment: '成功フラグ',
  })
  success: boolean;

  @Column('tinyint', {
    name: 'confirmed',
    width: 1,
    default: null,
    comment: '承認フラグ',
  })
  confirmed: boolean | null = null;

  @Index('room_id')
  @Column('bigint', {
    name: 'room_id',
    unsigned: true,
    nullable: false,
    comment: 'ルームID',
  })
  roomId: string;

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

  constructor(
    roomId: string,
    txHash: string | null,
    confirmed: boolean | null,
    success: boolean,
    sender: string,
    receiver: string,
    weiAmount: string,
  ) {
    this.roomId = roomId;
    this.txHash = txHash;
    this.confirmed = confirmed;
    this.success = success;
    this.sender = sender;
    this.receiver = receiver;
    this.weiAmount = weiAmount;
  }
}
