import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  mobileNumber: string;

  @Column()
  emailId: string;

  param_firstname: string;

  param_lastname: string;

  param_email: string;

  @Column()
  user_first_name: string;

  @Column()
  user_last_name: string;

  @Column()
  user_email: string;

}

