/* eslint-disable arrow-body-style */
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { IsEmail } from 'class-validator';
import Chat from './Chat';
import Message from './Message';
import Ride from './Ride';
import Place from './Place';

@Entity()
class User extends BaseEntity {
  BCRYPT_ROUND = 10;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: 'boolean', default: false })
  verifiedEmail: boolean;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: 'text' })
  profilePhoto: string;

  @Column({ type: 'text', nullable: true })
  fbId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ type: 'boolean', default: false })
  isDriving: boolean;

  @Column({ type: 'boolean', default: false })
  isRiding: boolean;

  @Column({ type: 'boolean', default: false })
  isTaken: boolean;

  @Column({ type: 'double precision', default: 0 })
  lastLng: number;

  @Column({ type: 'double precision', default: 0 })
  lastLat: number;

  @Column({ type: 'double precision', default: 0 })
  lastOrientation: number;

  @ManyToOne(
    (type) => Chat,
    (chat) => chat.participants
  )
  chat: Chat;

  @OneToMany(
    (type) => Message,
    (message) => message.user
  )
  messages: Message[];

  @OneToMany(
    (type) => Ride,
    (ride) => ride.passenger
  )
  ridesAsPassenger: Ride[];

  @OneToMany(
    (type) => Ride,
    (ride) => ride.driver
  )
  ridesAsDriver: Ride[];

  @OneToMany(
    (type) => Place,
    (place) => place.user
  )
  places: Place[];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public comparePassword = (password: string) => {
    return bcrypt.compare(password, this.password);
  };

  private hashPassword = (password: string) => {
    return bcrypt.hash(password, this.BCRYPT_ROUND);
  };

  @BeforeInsert()
  @BeforeUpdate()
  savePassword = async () => {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  };
}

export default User;
