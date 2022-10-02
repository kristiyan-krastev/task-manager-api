import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserNotFoundException } from "./exceptions/user-not-found.exception";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user === null) {
      throw new UserNotFoundException(id);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updateResult = await this.userRepository.update(id, updateUserDto);

      if (!!updateResult.affected) {
        return {
          updated: true
        };
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }

    throw new UserNotFoundException(id);
  }

  async remove(id: number) {
    try {
      const deleteResult = await this.userRepository.delete({ id });

      if (!!deleteResult.affected) {
        return {
          deleted: true
        };
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }

    throw new UserNotFoundException(id);
  }
}
