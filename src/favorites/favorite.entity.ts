import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number; // Llave primaria autogenerada

  @Column()
  userId: string; // ID del usuario

  @Column()
  comicId: string; // ID del cómic

  @Column()
  title: string; // Título del cómic

  @Column({ nullable: true })
  thumbnail: string; // URL de la imagen del cómic

  @Column({ nullable: true })
  description: string; // Descripción del cómic

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user: User;
}
