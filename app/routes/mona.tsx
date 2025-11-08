import type { Route } from "./+types/home";
import mona from "../mona.webp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mona" },
    { name: "description", content: "Una mona bailando" },
  ];
}

export default function Home() {
  return (
    <main className="grid size-full place-items-center h-dvh">
      <img src={mona} />
    </main>
  );
}
