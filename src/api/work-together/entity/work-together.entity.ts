import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class WorkTogether {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  company: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  budget: string

  @Column()
  message: string

  @Column({ default: false })
  isDone: boolean

  @CreateDateColumn()
  createdAt: Date
}
