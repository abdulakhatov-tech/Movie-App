import { IMovie } from "src/interfaces/app.interface";

export interface RawProps {
  title: string;
  movies: IMovie[];
  isBig?: boolean;
}
