import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Room } from './Room';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'ユーザーID',
  })
  readonly id: string;

  @Index('mail_UNIQUE', { unique: true })
  @Column('varchar', {
    name: 'mail',
    length: '255',
    default: null,
    comment: 'メールアドレス',
  })
  mail: string | null = null;

  @Index('eth_address_UNIQUE', { unique: true })
  @Column('varchar', {
    name: 'eth_address',
    length: '255',
    nullable: false,
    comment: 'Ethereumアドレス',
  })
  ethAddress: string;

  @Column('varchar', {
    name: 'nickname',
    length: '255',
    default: null,
    comment: 'ニックネーム',
  })
  nickname: string | null = null;

  @Column('varchar', {
    name: 'encrypted_Password',
    length: '255',
    default: null,
    comment: 'ハッシュ化されたパスワード',
  })
  encryptedPassword: string | null = null;

  @Column('varchar', {
    name: 'salt',
    length: '255',
    default: null,
    comment: 'ソルト値',
  })
  salt: string | null = null;

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

  @OneToMany(
    type => Room,
    rooms => rooms.user,
  )
  readonly rooms?: Room[];

  constructor(
    nickname: string | null,
    mail: string | null,
    ethAddress: string,
    encryptedPassword: string | null,
    salt: string | null,
  ) {
    this.nickname = nickname;
    this.mail = mail;
    this.ethAddress = ethAddress;
    this.encryptedPassword = encryptedPassword;
    this.salt = salt;
  }
}
