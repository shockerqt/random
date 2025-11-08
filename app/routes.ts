import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("mona", "routes/mona.tsx"),
  route("sudoku", "routes/sudoku.tsx"),
  route("rol", "routes/rol.tsx"),
] satisfies RouteConfig;
