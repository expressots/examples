import { useCallback, useEffect, useMemo, useState } from "react";
import { stringify } from "qs";
import { createAvatar } from "@dicebear/core";
import * as style from "@dicebear/adventurer";
import Svg from "react-inlinesvg";

// types

// zustand: hooks
import { useUser } from "../../../store";

// recoil: atoms
import AvatarOptionSelector from "../../Atoms/AvatarOptions";

// constants
import {
  AVATAR_EYES,
  AVATAR_FEATURES,
  AVATAR_GLASSES,
  AVATAR_HAIR,
  AVATAR_HAIR_COLOR,
  AVATAR_MOUTH,
  AVATAR_SKIN_COLOR,
  AVATAR_BACKGROUNDCOLOR,
  AVATAR_EARRINGS,
  AVATAR_EYEBROWS,
} from "./options";

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
} from "../../../types";
import { TCustomAvatarProps } from "./types";
import { ChevronUpDownIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { defaultAvatarEnum } from "../../../utils/enums";

// ::
const CustomAvatar = ({
  seed = "ExpressoTS",
  setConstructAvatar,
}: TCustomAvatarProps) => {
  // CONSTANTS
  const AVATAR_BASE_URL = "https://api.dicebear.com/6.x/adventurer";

  // local: states
  const [eyes, setEyes] = useState<TAvatarEyes>(defaultAvatarEnum.eyes);
  const [eyebrows, setEyesBrows] = useState<TAvatarEyebrows>(
    defaultAvatarEnum.eyebrows,
  );
  const [mouth, setMouth] = useState<TAvatarMouth>(defaultAvatarEnum.mouth);
  const [skinColor, setSkinColor] = useState<TAvatarSkinColor>(
    defaultAvatarEnum.skinColor,
  );
  const [earrings, setEarrings] = useState<TAvatarEarrings>(
    defaultAvatarEnum.earrings,
  );
  const [backgroundColor, setBackgroundColor] =
    useState<TAvatarBackgroundColor>(defaultAvatarEnum.backgroundColor);
  const [features, setFeatures] = useState<TAvatarFeatures>(
    defaultAvatarEnum.features,
  );
  const [glasses, setGlasses] = useState<TAvatarGlasses>(
    defaultAvatarEnum.glasses,
  );
  const [hair, setHair] = useState<TAvatarHair>(defaultAvatarEnum.hair);
  const [hairColor, setHairColor] = useState<TAvatarHairColor>(
    defaultAvatarEnum.hairColor,
  );
  const [earringsProbability, setEarringsProbability] = useState<0 | 100>(
    defaultAvatarEnum.earringsProbability,
  );
  const [glassesProbability, setGlassesProbability] = useState<0 | 100>(
    defaultAvatarEnum.glassesProbability,
  );
  const [featuresProbability, setFeaturesProbability] = useState<0 | 100>(
    defaultAvatarEnum.featuresProbability,
  );
  const [customToggle, setCustomToggle] = useState(false);

  // zustand: states
  const user = useUser();

  const handleToggleCheck = (bool: boolean) => {
    return bool ? 100 : (0 as 0 | 100);
  };

  const avatarOptions = useMemo(
    () => ({
      backgroundColor: [backgroundColor],
      earrings: [earrings],
      earringsProbability,
      glassesProbability,
      featuresProbability,
      hairProbability: 100,
      eyebrows: [eyebrows],
      eyes: [eyes],
      features: [features],
      glasses: [glasses],
      hair: [hair],
      hairColor: [hairColor],
      mouth: [mouth],
      seed,
      skinColor: [skinColor],
      flip: true,
    }),
    [
      backgroundColor,
      earrings,
      earringsProbability,
      eyebrows,
      eyes,
      features,
      featuresProbability,
      glasses,
      glassesProbability,
      hair,
      hairColor,
      mouth,
      seed,
      skinColor,
    ],
  );

  const avatar = useCallback(() => {
    return createAvatar(style, avatarOptions);
  }, [avatarOptions]);

  function setKeyValuePair<K extends string, V>(key: K, value: V) {
    // eslint-disable-next-line no-unused-vars
    return { [key]: value } as { [key in K]: V };
  }

  const avatarPreview = useCallback(
    <K extends string, V>(key: K, value: V) => {
      const avatarOptionsWithKeyValue = setKeyValuePair(key, value);
      return createAvatar(style, {
        ...avatarOptions,
        ...avatarOptionsWithKeyValue,
      });
    },
    [avatarOptions],
  );

  useEffect(() => {
    if (user?.avatar) {
      setSkinColor(user?.avatar?.skinColor);
      setEyes(user?.avatar?.eyes);
      setEyesBrows(user?.avatar?.eyebrows);
      setMouth(user?.avatar?.mouth);
      setEarrings(user?.avatar?.earrings || "variant01");
      setGlasses(user?.avatar?.glasses || "variant01");
      setHair(user?.avatar?.hair);
      setHairColor(user?.avatar?.hairColor);
      setBackgroundColor(user?.avatar?.backgroundColor);
      setFeatures(user?.avatar?.features || "birthmark");
      setEarringsProbability(user?.avatar?.earringsProbability);
      setGlassesProbability(user?.avatar.glassesProbability);
      setFeaturesProbability(user?.avatar.featuresProbability);
    }
  }, [user]);

  useEffect(() => {
    setConstructAvatar({
      backgroundColor,
      earrings,
      earringsProbability,
      eyebrows,
      eyes,
      features,
      featuresProbability,
      flip: true,
      glasses,
      glassesProbability,
      hair,
      hairColor,
      hairProbability: 100,
      mouth,
      seed,
      skinColor,
    });
  }, [avatarOptions]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="flex flex-col items-start justify-center gap-2 w-full">
        <div className="flex items-start justify-between w-full">
          <Svg
            src={avatar().toString()}
            className="h-24 w-24 rounded-md object-cover min-w-fit"
          />
          <button
            className="flex items-center justify-start gap-2 border-b-2 border-b-primary"
            onClick={() => setCustomToggle(!customToggle)}
          >
            Customize avatar
            <ChevronUpDownIcon className="h-5 w-5" />
          </button>
        </div>
        <div
          className={clsx(
            "transition-all flex flex-col w-full overflow-auto gap-2",
            customToggle ? "h-[50vh]" : "h-0",
          )}
        >
          <p className="max-w-xs my-5 flex gap-2 items-center justify-start bg-info font-semibold text-info-content rounded-sm p-2">
            <HandRaisedIcon className="h-5 w-5" />
            Drag to the side
          </p>
          <AvatarOptionSelector
            label="Eyes"
            setCurrentOption={setEyes}
            options={AVATAR_EYES}
            currentOption={[eyes]}
            preview={avatarPreview}
            optionKey="eyes"
          />
          <AvatarOptionSelector
            label="Skin"
            setCurrentOption={setSkinColor}
            options={AVATAR_SKIN_COLOR}
            currentOption={[skinColor]}
            preview={avatarPreview}
            optionKey="skinColor"
          />
          <AvatarOptionSelector
            label="Eyes brows"
            setCurrentOption={setEyesBrows}
            options={AVATAR_EYEBROWS}
            currentOption={[eyebrows]}
            preview={avatarPreview}
            optionKey="eyebrows"
          />

          <AvatarOptionSelector
            label="Mouth"
            setCurrentOption={setMouth}
            options={AVATAR_MOUTH}
            currentOption={[mouth]}
            preview={avatarPreview}
            optionKey="mouth"
          />
          <AvatarOptionSelector
            label="Background"
            setCurrentOption={setBackgroundColor}
            options={AVATAR_BACKGROUNDCOLOR}
            currentOption={[backgroundColor]}
            preview={avatarPreview}
            optionKey="backgroundColor"
          />
          <AvatarOptionSelector
            label="Hair"
            setCurrentOption={setHair}
            options={AVATAR_HAIR}
            currentOption={[hair]}
            preview={avatarPreview}
            optionKey="hair"
          />
          <AvatarOptionSelector
            preview={avatarPreview}
            label="Hair color"
            setCurrentOption={setHairColor}
            options={AVATAR_HAIR_COLOR}
            currentOption={[hairColor]}
            optionKey="hairColor"
          />
          <div className="form-control w-full">
            <label className="cursor-pointer py-2 flex justify-start items-center gap-2">
              <span>Features</span>
              <input
                onChange={(e) =>
                  setFeaturesProbability(handleToggleCheck(e.target.checked))
                }
                type="checkbox"
                className="toggle toggle-primary"
                checked={!!featuresProbability}
              />
            </label>
          </div>
          <AvatarOptionSelector
            setCurrentOption={setFeatures}
            options={AVATAR_FEATURES}
            currentOption={[features]}
            preview={avatarPreview}
            optionKey="features"
            disabled={!featuresProbability}
          />
          <div className="form-control w-full">
            <label className="cursor-pointer py-2 flex justify-start items-center gap-2">
              <span>Glasses</span>
              <input
                onChange={(e) =>
                  setGlassesProbability(handleToggleCheck(e.target.checked))
                }
                type="checkbox"
                className="toggle toggle-primary"
                checked={!!glassesProbability}
              />
            </label>
          </div>
          <AvatarOptionSelector
            setCurrentOption={setGlasses}
            options={AVATAR_GLASSES}
            currentOption={[glasses]}
            preview={avatarPreview}
            optionKey="glasses"
            disabled={!glassesProbability}
          />
          <div className="form-control w-full">
            <label className="cursor-pointer py-2 flex justify-start items-center gap-2">
              <span>Earrings</span>
              <input
                onChange={(e) =>
                  setEarringsProbability(handleToggleCheck(e.target.checked))
                }
                type="checkbox"
                className="toggle toggle-primary"
                checked={!!earringsProbability}
              />
            </label>
          </div>
          <AvatarOptionSelector
            setCurrentOption={setEarrings}
            options={AVATAR_EARRINGS}
            currentOption={[earrings]}
            preview={avatarPreview}
            optionKey="earrings"
            disabled={!earringsProbability}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomAvatar;
