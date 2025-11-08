// App.tsx
import React, { useState } from "react";
import { gameScenes } from "./GameData";

export const Rol: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState<string>("intro");
  const [history, setHistory] = useState<string[]>(["intro"]);

  const currentScene = gameScenes[currentSceneId];

  const handleChoice = (nextSceneId: string) => {
    setCurrentSceneId(nextSceneId);
    setHistory((prev) => [...prev, nextSceneId]);
  };

  const restartGame = () => {
    setCurrentSceneId("intro");
    setHistory(["intro"]);
  };

  if (!currentScene) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        <p className="text-xl">Error: Escena no encontrada.</p>
      </div>
    );
  }

  const endingBorderClass = currentScene.isEnding
    ? currentScene.endingType === "good"
      ? "border-green-500"
      : "border-red-500"
    : "border-gray-700";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div
        className={`bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl w-full border-4 ${endingBorderClass}`}
      >
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
          {currentScene.title}
        </h1>

        {/* Aquí es donde se muestra la imagen */}
        {currentScene.imageSrc && (
          <div className="mb-6 rounded-lg overflow-hidden shadow-md">
            <img
              src={currentScene.imageSrc}
              alt={currentScene.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line mb-8">
          {currentScene.text}
        </p>

        <div className="flex flex-col space-y-4">
          {currentScene.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice.nextSceneId)}
              className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {choice.text}
            </button>
          ))}
        </div>

        {currentScene.isEnding &&
          currentScene.choices.length === 1 &&
          currentScene.choices[0].nextSceneId === "intro" && (
            <button
              onClick={restartGame}
              className="mt-8 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              ¡Volver a Empezar!
            </button>
          )}
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        Un juego de rol creado por la inspiración de la hamburguesa de Yue.
      </p>
    </div>
  );
};
