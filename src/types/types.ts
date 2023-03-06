import { POSITIONS, TOOLS } from "../constants/enums";

type Position = keyof typeof POSITIONS;

type Tool = keyof typeof TOOLS

export { Position, Tool }
