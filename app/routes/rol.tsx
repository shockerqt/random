import { Rol } from "~/rol/Rol";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zavier simulator" },
    { name: "description", content: "Juego de rol" },
  ];
}

export default function Home() {
  return <Rol />;
}
