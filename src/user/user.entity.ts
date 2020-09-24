import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';

import { UserRO } from "./user.dto";
import { QuoteEntity } from "src/quote/quote.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column({
        type: 'text',
        unique: true
    })
    username: string;

    @Column('text')
    password: string;

    @OneToMany(type => QuoteEntity, quote => quote.author)
    quotes: QuoteEntity[];


    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean = true): UserRO {
        const { id, created, username, token } = this;
        const responseObject: UserRO = { id, created, username};
        if (showToken) {
            responseObject.token = token;
        }
        return responseObject;
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const { id, username } = this;
        return jwt.sign(
            {
                id,
                username,
            },
            process.env.SECRET,
            { expiresIn: '7d' },
        );
    }
}