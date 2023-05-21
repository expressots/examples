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
} from "@providers/types/avatar";

interface IUserDTO {
  id?: string;
  password: string;
  email: string;
  name: string;
  avatar: IUserAvatarDTO;
}

interface IUserAvatarDTO {
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
  url: string;
}

export { IUserDTO, IUserAvatarDTO };
