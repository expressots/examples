import * as PrismaModelType from "@prisma/client";
import { User } from "@entities/user.entity";
import {
  PrismaClientProvider,
  prismaClient,
} from "@providers/database/orm/prisma/prisma-client.provider";
import bcrypt from "bcrypt";
import { provide } from "inversify-binding-decorators";
import { IUserRepository } from "./user-repository.interface";
import { IUserAvatarDTO, IUserDTO } from "./user.dto";

@provide(UserRepository)
class UserRepository implements IUserRepository {
  constructor(private prismaProvider: PrismaClientProvider) {}

  async find(id: string): Promise<{ name: string; email: string } | null> {
    const user = await prismaClient.user.findUnique({
      where: { id },
      include: {
        avatar: true,
      },
    });

    const avatar = user?.avatar as unknown as IUserAvatarDTO;

    return user ? this.mapToDTOWithoutPassword({ ...user, avatar }) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { email },
      include: {
        avatar: true,
      },
    });

    const avatar = user?.avatar as unknown as IUserAvatarDTO;

    return user ? this.mapToDTO({ ...user, avatar }) : null;
  }

  async findAll(): Promise<{ name: string; email: string }[]> {
    const users = await prismaClient.user.findMany({
      include: {
        avatar: true,
      },
    });

    return users.map((user) => {
      const avatar = user?.avatar as unknown as IUserAvatarDTO;

      return this.mapToFindAllDTO({ ...user, avatar });
    });
  }

  async create(user: IUserDTO): Promise<User> {
    const password = await bcrypt.hash(user.password, 10);
    const prismaObject = this.prismaProvider.mapToPrisma<
      IUserDTO,
      PrismaModelType.User
    >({
      ...user,
      password,
    });

    const createdUser = await prismaClient.user.create({
      include: {
        avatar: true,
      },
      data: {
        ...prismaObject,
        avatar: {
          create: {
            ...user.avatar,
          },
        },
      },
    });

    const avatar = createdUser.avatar as unknown as IUserAvatarDTO;

    return this.mapToDTO({
      ...createdUser,
      avatar,
    });
  }

  async update(id: string, user: IUserDTO): Promise<User | null> {
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: this.prismaProvider.mapToPrisma<IUserDTO, PrismaModelType.User>(
        user,
      ),
    });

    return this.mapToDTO({ ...updatedUser, avatar: user.avatar });
  }

  async delete(id: string): Promise<boolean> {
    await prismaClient.user.delete({ where: { id } });
    return true;
  }

  private mapToDTO(user: IUserDTO): User {
    const newUser = new User(
      user.name,
      user.email,
      user.password,
      user.avatar,
      user.id,
    );
    return newUser;
  }

  private mapToDTOWithoutPassword(user: IUserDTO): {
    name: string;
    avatar: IUserAvatarDTO;
    email: string;
    id: string;
  } {
    const newUser = new User(
      user.name,
      user.email,
      user.password,
      user.avatar,
      user.id,
    );
    return {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      id: newUser.id,
    };
  }

  private mapToFindAllDTO(user: IUserDTO): { name: string; email: string } {
    const newUser = new User(
      user.name,
      user.email,
      user.password,
      user.avatar,
      user.id,
    );
    return {
      name: newUser.name,
      email: newUser.email,
    };
  }
}

export { UserRepository };
