import { PrismaClient } from "@prisma/client";
import { provide } from "inversify-binding-decorators";

export const prismaClient: PrismaClient = new PrismaClient();

@provide(PrismaClientProvider)
class PrismaClientProvider {
  public mapToPrisma<DTOType, PrismaType>(dto: DTOType): PrismaType {
    const mappedObject = {} as PrismaType;

    for (const [key, value] of Object.entries(dto as any)) {
      if (key === "_id") {
        mappedObject["id"] = value as PrismaType[keyof PrismaType];
      } else if (key === "_password") {
        mappedObject["password"] = value as PrismaType[keyof PrismaType];
      } else {
        mappedObject[key as keyof PrismaType] =
          value as PrismaType[keyof PrismaType];
      }
    }

    return mappedObject;
  }
}

export { PrismaClientProvider };
