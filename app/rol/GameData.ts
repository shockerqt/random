// GameData.ts
import { type Scene } from "./types";

export const gameScenes: { [key: string]: Scene } = {
  intro: {
    id: "intro",
    title: "La Melodía del Alma",
    text: `
      Zavier, un talentoso músico con un futuro prometedor, está inmerso en su estudio. 
      Las notas fluyen de sus dedos, creando un "temazo" que promete ser la obra maestra de su carrera. 
      La inspiración lo envuelve, el ambiente es sereno y lleno de creatividad.
      De repente, un golpe en la puerta interrumpe su concentración. Es Yue, su amigo de la infancia, 
      con una sonrisa que oculta... ¿qué?
    `,
    choices: [
      { text: "Abre la puerta y saluda a Yue.", nextSceneId: "yueArrival" },
      {
        text: 'Ignora la puerta y sigue componiendo. "La inspiración no espera."',
        nextSceneId: "compositionFocus",
      },
    ],
  },
  yueArrival: {
    id: "yueArrival",
    title: "La Propuesta Irresistible",
    text: `
      Abres la puerta y ahí está Yue, con una bolsa de papel que desprende un aroma delicioso.
      "¡Zavier, hermano! ¿Qué tal? He pasado por tu local de hamburguesas favorito. 
      ¡Tenemos que ir por una 'Rey Hamburguesa' antes de que cierre! Es la última del día, ¡y con extra de tocino!".
      Zavier mira el reloj. Su temazo casi está listo, pero la tentación de la "Rey Hamburguesa" es fuerte...
    `,
    choices: [
      {
        text: '¡Claro que sí, Yue! Una hamburguesa es una excelente idea. "La inspiración puede esperar."',
        nextSceneId: "acceptBurger",
        consequence: "Acepta la hamburguesa",
      },
      {
        text: 'No puedo ahora, Yue. Estoy a punto de terminar el "temazo" de mi vida. Quizás otro día.',
        nextSceneId: "declineBurger",
        consequence: "Rechaza la hamburguesa",
      },
    ],
  },
  compositionFocus: {
    id: "compositionFocus",
    title: "El Sacrificio por el Arte",
    text: `
      Decides ignorar a Yue. La música es tu prioridad. Te sumerges de nuevo en la composición, 
      las notas fluyen con una intensidad renovada. La melodía se perfecciona, la armonía se eleva.
      Pasadas unas horas, el "temazo" está terminado. Es una obra maestra, una sinfonía que resonará en el tiempo.
      Yue ya se ha ido, probablemente con su hamburguesa. Te sientes un poco solo, pero la satisfacción 
      de tu logro artístico es inmensa.
    `,
    choices: [
      {
        text: "Fin del camino: ¡Triunfo artístico!",
        nextSceneId: "goodEnding",
        consequence: "Zavier se enfoca en su música",
      },
    ],
    isEnding: true,
    endingType: "good",
  },
  acceptBurger: {
    id: "acceptBurger",
    title: "El Comienzo del Descenso",
    text: `
      "¡Vamos, Yue!" exclamas, dejando el teclado a un lado. La promesa de la hamburguesa es demasiado tentadora.
      Sales con tu amigo, el aroma a tocino y queso llenando tus sentidos.
      Una hamburguesa se convierte en dos, luego en unas papas, una gaseosa... La charla con Yue se extiende,
      hablan de trivialidades, de planes sin rumbo. El "temazo" olvidado.
      Por primera vez, sientes una punzada de culpa, pero la rica comida y la compañía de Yue lo ahogan rápidamente.
      Es solo una vez, piensas. Pero el camino hacia el "mal" suele empezar con un solo paso.
    `,
    choices: [
      {
        text: "Fin del camino: La tentación es fuerte.",
        nextSceneId: "badPathPart1",
        consequence: "Zavier elige la tentación",
      },
    ],
  },
  declineBurger: {
    id: "declineBurger",
    title: "El Compromiso con la Excelencia",
    text: `
      "Lo siento, Yue. Este 'temazo' no puede esperar. Nos vemos otro día para esa hamburguesa", respondes con firmeza.
      Yue, aunque un poco decepcionado, asiente y se despide.
      Vuelves a tu instrumento con una nueva determinación. Has resistido la tentación.
      Las notas fluyen con más pasión, con un propósito renovado. El "temazo" se convierte en algo más que música;
      es la manifestación de tu disciplina y amor por el arte.
    `,
    choices: [
      {
        text: "Fin del camino: ¡Disciplina y Pasión!",
        nextSceneId: "goodEnding",
        consequence: "Zavier se mantiene firme",
      },
    ],
    isEnding: true,
    endingType: "good",
  },
  badPathPart1: {
    id: "badPathPart1",
    title: "El Dulce Abismo de la Distracción",
    text: `
      Los días pasan. La rutina de Zavier cambia. El "temazo" sigue inconcluso, cubierto por una fina capa de polvo.
      Las visitas de Yue son más frecuentes, y siempre hay un nuevo plan: "un videojuego", "una serie", "una fiesta".
      La creatividad de Zavier se marchita lentamente, reemplazada por el letargo y la comodidad.
      Se encuentra a sí mismo procrastinando, perdiendo horas en redes sociales, en lugar de frente a su teclado.
      El brillante futuro que una vez soñó parece ahora un recuerdo distante.
    `,
    choices: [
      {
        text: "¿Qué sigue para Zavier?",
        nextSceneId: "badEnding",
        consequence: "Zavier se distrae del arte",
      },
    ],
  },
  goodEnding: {
    id: "goodEnding",
    title: "El Maestro Compositor",
    text: `
      Zavier se convierte en un músico de renombre mundial. Su "temazo" es un éxito rotundo, 
      nominado a múltiples premios y aclamado por la crítica. Su disciplina y pasión lo llevaron a la cima.
      Aunque a veces extraña la compañía espontánea de Yue, sabe que su decisión lo llevó a realizar su verdadero potencial.
      La música es su vida, su legado.
    `,
    choices: [{ text: "Volver a jugar", nextSceneId: "intro" }],
    isEnding: true,
    endingType: "good",
  },
  badEnding: {
    id: "badEnding",
    title: "El Camino Perdido",
    text: `
      Los años pasan y Zavier es un fantasma de lo que pudo ser. Su estudio se ha convertido en un cuarto de trastos.
      El teclado, un monumento silencioso a los sueños rotos, acumula polvo.
      Pasa sus días trabajando en un empleo sin sentido, lamentando las decisiones que tomó.
      Yue sigue siendo su amigo, pero sus charlas ahora son sobre cómo pagar las cuentas, no sobre el arte.
      La "Rey Hamburguesa" se convirtió en el primer bocado de un camino de arrepentimiento.
    `,
    choices: [{ text: "Volver a jugar", nextSceneId: "intro" }],
    isEnding: true,
    endingType: "bad",
  },
};
