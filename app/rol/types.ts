// types.ts

export type Choice = {
  text: string;
  nextSceneId: string;
  consequence?: string; // Para mostrar un resumen de la decisión
};

export type Scene = {
  id: string;
  title: string;
  text: string;
  choices: Choice[];
  isEnding?: boolean;
  endingType?: "good" | "bad" | "neutral"; // Para diferenciar los finales
};
