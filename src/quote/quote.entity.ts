import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('quote')
export class QuoteEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @Column('text') title: string;
    @Column('text') description: string;

}