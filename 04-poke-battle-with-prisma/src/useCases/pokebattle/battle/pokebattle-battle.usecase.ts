import { provide } from "inversify-binding-decorators";
import {
  IPokebattleBattleLogResponseDTO,
  IPokebattleBattleRequestDTO,
  IPokebattleBattleResponseDTO,
} from "./pokebattle-battle.dto";
import { BattleRepository } from "@repositories/battle/battle.repository";

import { TYPE_CHART } from "@providers/battle/typechart";
import {
  PokemonAbilities,
  PokemonForm,
  GameIndices,
  PokemonSpecies,
  PokemonSprites,
  PokemonTypes,
  PokemonMoves,
} from "@providers/types/battle";

@provide(PokebattleBattleUseCase)
class PokebattleBattleUseCase {
  constructor(private historyRepository: BattleRepository) {}

  async execute({
    body,
    token,
  }: {
    body: IPokebattleBattleRequestDTO;
    token: any;
  }): Promise<IPokebattleBattleResponseDTO | null> {
    const { name, id } = token;
    const { pokemon1, pokemon2 } = body;

    const challenger = {
      name: pokemon1.name,
      sprites: [
        pokemon1.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
        pokemon1.sprites.front_default,
        pokemon1.sprites.other["official-artwork"].front_default,
      ],
      types: pokemon1.types.map((item) => item.type.name),
    };

    const challenged = {
      name: pokemon2.name,
      sprites: [
        pokemon2.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
        pokemon2.sprites.front_default,
        pokemon2.sprites.other["official-artwork"].front_default,
      ],
      types: pokemon2.types.map((item) => item.type.name),
    };

    const onFight = async (): Promise<IPokebattleBattleResponseDTO> => {
      // Log da batalha
      const battleLog = [] as IPokebattleBattleLogResponseDTO[];
      // Define a variável de turno
      let turn = 0;

      // Define os valores iniciais dos Pokémons
      const pokemon1_hp = pokemon1.stats[0].base_stat;
      const pokemon2_hp = pokemon2.stats[0].base_stat;

      // Cria a função de ataque do Pokémon
      async function attack(
        attacker: {
          abilities?: PokemonAbilities[];
          base_experience?: number;
          forms?: PokemonForm[];
          game_indices?: GameIndices[];
          height?: number;
          held_items?: any[];
          id: number;
          is_default?: boolean;
          location_area_encounters?: string;
          moves: any;
          name: any;
          order?: number;
          past_types?: any[];
          species?: PokemonSpecies;
          sprites?: PokemonSprites;
          stats: any;
          types?: PokemonTypes[];
          weight?: number;
        },
        defender: {
          abilities?: PokemonAbilities[];
          base_experience?: number;
          forms?: PokemonForm[];
          game_indices?: GameIndices[];
          height?: number;
          held_items?: any[];
          id: number;
          is_default?: boolean;
          location_area_encounters?: string;
          moves?: PokemonMoves[];
          name: any;
          order?: number;
          past_types?: any[];
          species?: PokemonSpecies;
          sprites?: PokemonSprites;
          stats: any;
          types: any;
          weight?: number;
        },
      ) {
        // Seleciona um movimento aleatório do atacante
        const move_index = Math.floor(Math.random() * attacker.moves.length);
        const move_response = await fetch(attacker.moves[move_index].move.url);
        const move = await move_response.json();

        // Obtém as informações dos tipos dos Pokémons
        const defender_types = defender.types.map((type) => type?.type?.name);

        // Calcula o dano causado pelo ataque
        const attack_stat = attacker.stats.find(
          (stat) => stat?.stat?.name === "attack",
        ).base_stat;
        const defense_stat = defender.stats.find(
          (stat) => stat?.stat?.name === "defense",
        ).base_stat;
        const level = 50; // Define o nível dos Pokémons como 50
        const power = move.power;
        const effectiveness =
          TYPE_CHART?.[move?.type?.name][defender_types[0]] *
          (defender_types[1]
            ? TYPE_CHART?.[move?.type?.name][defender_types?.[1]]
            : 1);
        const modifier = Math.random() * (1.0 - 0.85) + 0.85;
        const damage =
          Math.floor(
            ((((2 * level) / 5 + 2) * power * (attack_stat / defense_stat)) /
              50 +
              2) *
              effectiveness *
              modifier,
          ) + 1;

        // Aplica o dano ao Pokémon defensor
        defender.stats[0].base_stat -= damage;

        // Atualiza o log
        battleLog.push({
          attack: move?.name,
          attacker: attacker.name,
          defender: defender.name,
          damage,
          attackType: attacker.types?.[0].type.name || "undefined",
          turn,
        });
      }

      // Enquanto ambos os Pokémons estiverem vivos, eles continuam lutando
      while (pokemon1_hp > 0 && pokemon2_hp > 0) {
        // Aumenta o número do turno
        turn++;

        // Pokémon 1 ataca Pokémon 2
        await attack(pokemon1, pokemon2);

        // Verifica se Pokémon 2 ainda está vivo
        if (pokemon2.stats[0].base_stat <= 0) {
          return {
            log: battleLog,
            playerId: id,
            pokemon1: challenger,
            pokemon2: challenged,
            userName: name,
            winner: true,
            winnerName: challenger.name,
            loserName: challenged.name,
            isDraw: false,
          };
        }
        // Pokémon 2 ataca Pokémon 1
        await attack(pokemon2, pokemon1);

        // Verifica se Pokémon 1 ainda está vivo
        if (pokemon1.stats[0].base_stat <= 0) {
          return {
            log: battleLog,
            playerId: id,
            pokemon1: challenger,
            pokemon2: challenged,
            userName: name,
            winner: false,
            winnerName: challenged.name,
            loserName: challenger.name,
            isDraw: false,
          };
        }
      }

      return {
        log: battleLog,
        playerId: id,
        pokemon1: challenger,
        pokemon2: challenged,
        userName: name,
        winner: false,
        loserName: challenger.name,
        winnerName: challenged.name,
        isDraw: true,
      };
    };

    const battle = await onFight();

    const userHistory = await this.historyRepository.create(battle);

    return userHistory;
  }
}

export { PokebattleBattleUseCase };
