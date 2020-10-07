import { ConnectionOptions } from 'typeorm';
import { Quest } from './entity/Quest';
import { Question } from './entity/Question';
import { Room } from './entity/Room';
import { User } from './entity/User';
import { Deposit } from './entity/Deposit';
import { Payment } from './entity/Payment';

// DB接続の設定
export const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'mysql',
  database: 'room',
  entities: [Deposit, Quest, Payment, Question, Room, User],
  synchronize: true,
};
