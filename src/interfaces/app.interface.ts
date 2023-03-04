export interface IMovie {
  //Iterface Movie
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
  name: string;
  original_name: string;
  release_date: string;
}

export interface Element {
  type: "Trailer" | "Clip" | "Opening Credits" | "Behind the Scenes";
}
