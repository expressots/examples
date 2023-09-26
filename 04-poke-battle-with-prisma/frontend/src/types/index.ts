export type TAvatarBackgroundColor =
  | "b6e3f4"
  | "c0aede"
  | "d1d4f9"
  | "ffd5dc"
  | "ffdfbf";

export type TAvatarEarrings =
  | "variant01"
  | "variant02"
  | "variant03"
  | "variant04"
  | "variant05"
  | "variant06";

export type TAvatarEyebrows =
  | "variant01"
  | "variant02"
  | "variant03"
  | "variant04"
  | "variant05"
  | "variant06"
  | "variant07"
  | "variant08"
  | "variant09"
  | "variant10"
  | "variant11"
  | "variant12"
  | "variant13"
  | "variant14"
  | "variant15";

export type TAvatarEyes =
  | "variant01"
  | "variant02"
  | "variant03"
  | "variant04"
  | "variant05"
  | "variant06"
  | "variant07"
  | "variant08"
  | "variant09"
  | "variant10"
  | "variant11"
  | "variant12"
  | "variant13"
  | "variant14"
  | "variant15"
  | "variant16"
  | "variant17"
  | "variant18"
  | "variant19"
  | "variant20"
  | "variant21"
  | "variant22"
  | "variant23"
  | "variant24"
  | "variant25"
  | "variant26";

export type TAvatarFeatures = "birthmark" | "blush" | "freckles" | "mustache";

export type TAvatarGlasses =
  | "variant01"
  | "variant02"
  | "variant03"
  | "variant04"
  | "variant05";

export type TAvatarHair =
  | "long01"
  | "long02"
  | "long03"
  | "long04"
  | "long05"
  | "long06"
  | "long07"
  | "long08"
  | "long09"
  | "long10"
  | "long11"
  | "long12"
  | "long13"
  | "long14"
  | "long15"
  | "long16"
  | "long17"
  | "long18"
  | "long19"
  | "long20"
  | "long21"
  | "long22"
  | "long23"
  | "long24"
  | "long25"
  | "long26"
  | "short01"
  | "short02"
  | "short03"
  | "short04"
  | "short05"
  | "short06"
  | "short07"
  | "short08"
  | "short09"
  | "short10"
  | "short11"
  | "short12"
  | "short13"
  | "short14"
  | "short15"
  | "short16"
  | "short17"
  | "short18"
  | "short19";

export type TAvatarHairColor =
  | "0e0e0e"
  | "3eac2c"
  | "6a4e35"
  | "85c2c6"
  | "796a45"
  | "562306"
  | "592454"
  | "ab2a18"
  | "ac6511"
  | "afafaf"
  | "b9a05f"
  | "cb6820"
  | "dba3be"
  | "e5d7a3"
  | "f3f4f6"
  | "fde68a";

export type TAvatarMouth =
  | "variant01"
  | "variant02"
  | "variant03"
  | "variant04"
  | "variant05"
  | "variant06"
  | "variant07"
  | "variant08"
  | "variant09"
  | "variant10"
  | "variant11"
  | "variant12"
  | "variant13"
  | "variant14"
  | "variant15"
  | "variant16"
  | "variant17"
  | "variant18"
  | "variant19"
  | "variant20"
  | "variant21"
  | "variant22"
  | "variant23"
  | "variant24"
  | "variant25"
  | "variant26"
  | "variant27"
  | "variant28"
  | "variant29"
  | "variant30";

export type TAvatarSkinColor = "9e5622" | "763900" | "ecad80" | "f2d3b1";

export type TPokemonListEndpoint = {
  count: number;
  next: string;
  previous: any;
  results: TPokemonListEndpointResult[];
};

export type TPokemonListEndpointResult = {
  name: string;
  url: string;
};

export type TPokemonContentEndpoint = {
  abilities: PokemonAbilities[];
  base_experience: number;
  forms: PokemonForm[];
  game_indices: GameIndices[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMoves[];
  name: string;
  order: number;
  past_types: any[];
  species: PokemonSpecies;
  sprites: PokemonSprites;
  stats: PokemonStats[];
  types: PokemonTypes[];
  weight: number;
};

export type PokemonAbilities = {
  ability: PokemonAbility;
  is_hidden: boolean;
  slot: number;
};

export type PokemonAbility = {
  name: string;
  url: string;
};

export type PokemonForm = {
  name: string;
  url: string;
};

export type GameIndices = {
  game_index: number;
  version: PokemonVersion;
};

export type PokemonVersion = {
  name: string;
  url: string;
};

export type PokemonMoves = {
  move: Move;
  version_group_details: PokemonVersionGroupDetail[];
};

export type Move = {
  name: string;
  url: string;
};

export type PokemonVersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: PokemonMoveLearnMethod;
  version_group: PokemonVersionGroup;
};

export type PokemonMoveLearnMethod = {
  name: string;
  url: string;
};

export type PokemonVersionGroup = {
  name: string;
  url: string;
};

export type PokemonSpecies = {
  name: string;
  url: string;
};

export type PokemonSprites = {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
  other: PokemonOtherSprites;
  versions: PokemonVersions;
};

export type PokemonOtherSprites = {
  dream_world: PokemonDreamWorldSprites;
  home: PokemonHomeSprites;
  "official-artwork": PokemonOfficialArtworkSprites;
};

export type PokemonDreamWorldSprites = {
  front_default: string;
  front_female: any;
};

export type PokemonHomeSprites = {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type PokemonOfficialArtworkSprites = {
  front_default: string;
  front_shiny: string;
};

export type PokemonVersions = {
  "generation-i": PokemonGenerationI;
  "generation-ii": PokemonGenerationIi;
  "generation-iii": PokemonGenerationIii;
  "generation-iv": PokemonGenerationIv;
  "generation-v": PokemonGenerationV;
  "generation-vi": PokemonGenerationVi;
  "generation-vii": PokemonGenerationVii;
  "generation-viii": PokemonGenerationViii;
};

export type PokemonGenerationI = {
  "red-blue": PokemonRedBlue;
  yellow: PokemonYellow;
};

export type PokemonRedBlue = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
};

export type PokemonYellow = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
};

export type PokemonGenerationIi = {
  crystal: PokemonCrystal;
  gold: PokemonGold;
  silver: PokemonSilver;
};

export type PokemonCrystal = {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
};

export type PokemonGold = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
};

export type PokemonSilver = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
};

export type PokemonGenerationIii = {
  emerald: PokemonEmerald;
  "firered-leafgreen": PokemonFireredLeafgreen;
  "ruby-sapphire": PokemonRubySapphire;
};

export type PokemonEmerald = {
  front_default: string;
  front_shiny: string;
};

export type PokemonFireredLeafgreen = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
};

export type PokemonRubySapphire = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
};

export type PokemonGenerationIv = {
  "diamond-pearl": PokemonDiamondPearl;
  "heartgold-soulsilver": PokemonHeartgoldSoulsilver;
  platinum: PokemonPlatinum;
};

export type PokemonDiamondPearl = {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type PokemonHeartgoldSoulsilver = {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type PokemonPlatinum = {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type PokemonGenerationV = {
  "black-white": PokemonBlackWhite;
};

export type PokemonBlackWhite = {
  animated: PokemonAnimated;
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type PokemonAnimated = {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type PokemonGenerationVi = {
  "omegaruby-alphasapphire": PokemonOmegarubyAlphasapphire;
  "x-y": PokemonXY;
};

export type PokemonOmegarubyAlphasapphire = {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type PokemonXY = {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type PokemonGenerationVii = {
  icons: PokemonIcons;
  "ultra-sun-ultra-moon": PokemonUltraSunUltraMoon;
};

export type PokemonIcons = {
  front_default: string;
  front_female: any;
};

export type PokemonUltraSunUltraMoon = {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type PokemonGenerationViii = {
  icons: PokemonIcons2;
};

export type PokemonIcons2 = {
  front_default: string;
  front_female: any;
};

export type PokemonStats = {
  base_stat: number;
  effort: number;
  stat: PokemonStat;
};

export type PokemonStat = {
  name: string;
  url: string;
};

export type PokemonTypes = {
  slot: number;
  type: PokemonType;
};

export type PokemonType = {
  name: string;
  url: string;
};
