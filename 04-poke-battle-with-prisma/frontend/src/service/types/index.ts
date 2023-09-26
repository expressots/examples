import {
  TAvatarBackgroundColor,
  TAvatarEarrings,
  TAvatarEyebrows,
  TAvatarEyes,
  TAvatarFeatures,
  TAvatarGlasses,
  TAvatarHair,
  TAvatarHairColor,
  TAvatarMouth,
  TAvatarSkinColor,
} from "../../types";

export interface IUserAvatar {
  backgroundColor: TAvatarBackgroundColor;
  earrings: TAvatarEarrings;
  earringsProbability: 0 | 100;
  glassesProbability: 0 | 100;
  featuresProbability: 0 | 100;
  hairProbability: 100;
  eyebrows: TAvatarEyebrows;
  eyes: TAvatarEyes;
  features: TAvatarFeatures;
  glasses: TAvatarGlasses;
  hair: TAvatarHair;
  hairColor: TAvatarHairColor;
  mouth: TAvatarMouth;
  seed: string;
  skinColor: TAvatarSkinColor;
  flip: boolean;
  url?: string;
}

export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar: IUserAvatar;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TCreateRequest = {
  name: string;
  avatar: IUserAvatar;
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
