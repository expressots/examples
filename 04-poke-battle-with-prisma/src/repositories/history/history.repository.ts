import { provide } from "inversify-binding-decorators";
import { prismaClient } from "@providers/database/prismaClient";
import { IHistoryRepository } from "./history-repository.interface";
import { IHistoryDTO } from "./history.dto";
import { History } from "@entities/history.entity";

import { mapHistoryToPrisma } from "@providers/helpers/mapToPrisma";
import { randomUUID } from "crypto";

@provide(HistoryRepository)
class HistoryRepository implements IHistoryRepository {
    private readonly repository = prismaClient;

    async findAll(id: string): Promise<IHistoryDTO[]> {
        const historys = await this.repository.history.findMany({
            where: {
                playerId: id,
            },
        });

        return historys.map((history) => {
            const log = history.log as {
                turn: number;
                attacker: string;
                defender: string;
                attack: string;
                attackType: string;
                damage: number;
            }[];
            return this.mapToDTO({ ...history, log });
        });
    }

    async create(history: IHistoryDTO): Promise<History> {
        const createHistory = await this.repository.history.create({
            data: mapHistoryToPrisma({
                ...history,
            }),
        });

        const log = createHistory.log as {
            turn: number;
            attacker: string;
            defender: string;
            attack: string;
            attackType: string;
            damage: number;
        }[];

        return this.mapToDTO({ ...createHistory, log });
    }

    private mapToDTO(history: IHistoryDTO): History {
        const newHistory = new History(
            history.log,
            history.userName,
            history.playerId,
            history.winner,
            history.pokemon1,
            history.pokemon2,
            history.id || randomUUID(),
            history.winnerName,
            history.loserName,
            history.isDraw,
        );
        return newHistory;
    }
}

export { HistoryRepository };
