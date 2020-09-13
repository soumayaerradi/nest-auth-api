import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private _userRepository: Repository<UserEntity>,
    ) { }

    async showAll(): Promise<UserRO[]> {
        const users = await this._userRepository.find();
        return users.map(user => user.toResponseObject(false));
    }

    async login(data: UserDTO): Promise<UserRO> {
        const { username, password } = data;
        const user = await this._userRepository.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject();
    }

    async register(data: UserDTO): Promise<UserRO> {
        const { username } = data;
        let user = await this._userRepository.findOne({ where: { username } });
        if (user) {
            throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
        }
        user = await this._userRepository.create(data);
        await this._userRepository.save(user);
        return user.toResponseObject();
    }
}
