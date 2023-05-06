export type TUser = {
  id: string;
  name: string;
  email: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TCreateRequest = {
  name: string;
} & TLoginRequest;

export type TAuthResponse = {
  token: string;
} & TUser;

export type THistoryBattleRequest = {
  id: string;
};

export type THistoryBattleLog = {
  turn: number;
  attacker: string;
  defender: string;
  attack: string;
  attackType: string;
  damage: number;
};

export type THistoryBattlePokemon = {
  name: string;
  sprites: string[];
  types: string[];
};

export type THistoryBattleResponse = {
  id?: string;
  userName: string;
  playerId: string;
  pokemon1: THistoryBattlePokemon;
  pokemon2: THistoryBattlePokemon;
  log: THistoryBattleLog[];
  winner: boolean;
  winnerName: string;
  loserName: string;
  isDraw: boolean;
};
