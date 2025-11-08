// types.ts

export type Choice = {
  text: string;
  nextSceneId: string;
  consequence?: string;
};

export type Scene = {
  id: string;
  title: string;
  text: string;
  choices: Choice[];
  isEnding?: boolean;
  endingType?: "good" | "bad" | "neutral";
  imageSrc: string; // <-- ¡Añadido aquí!
};
