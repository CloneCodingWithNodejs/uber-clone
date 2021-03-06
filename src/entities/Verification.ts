import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { verificationTarget } from 'src/types/types';

const PHONE = 'PHONE';
const EMAIL = 'EMAIL';

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', enum: [PHONE, EMAIL] })
  target: verificationTarget;

  @Column({ type: 'text' })
  payload: string;

  @Column({ type: 'text' })
  key: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updated: string;

  @BeforeInsert()
  createKey = (): void => {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString();
    } else {
      this.key = Math.random()
        .toString(36)
        .substr(2);
    }
  };
}

export default Verification;
