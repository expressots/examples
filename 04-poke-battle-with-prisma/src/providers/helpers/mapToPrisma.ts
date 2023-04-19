import { User as PrismaUser, History as PrismaHistory } from "@prisma/client";
import { IHistoryDTO } from "@repositories/history/history.dto";
import { IUserDTO } from "@repositories/user/user.dto";
import { randomUUID } from "crypto";

export function mapToPrisma(user: IUserDTO): PrismaUser {
  const toMap = {
    name: user.name,
    email: user.email,
    password: user.password,
    id: user.id ?? randomUUID(),
  };

  return toMap;
}

export function mapHistoryToPrisma(history: IHistoryDTO): PrismaHistory {
  const toMap = {
    id: history.id || randomUUID(),
    log: history.log.map((item) => ({
      turn: item.turn,
      attacker: item.attacker,
      defender: item.defender,
      attack: item.attack,
      attackType: item.attackType,
      damage: item.damage,
    })),
    userName: history.userName,
    playerId: history.playerId,
    pokemon1: history.pokemon1,
    pokemon2: history.pokemon2,
    winner: history.winner,
    winnerName: history.winnerName,
    loserName: history.loserName,
    isDraw: history.isDraw,
  };

  return toMap;
}
