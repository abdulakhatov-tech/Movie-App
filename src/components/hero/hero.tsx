import Image from "next/image";
import { useState, useEffect } from "react";
import { image_base } from "src/helpers/contants";
import { IMovie } from "src/interfaces/app.interface";
import { HeroProps } from "./hero.props";
import { TbPlayerPlay } from "react-icons/tb";
import ReactStars from "react-stars";

const Hero = ({ trending }: HeroProps): JSX.Element => {
  const [movie, setMovie] = useState<IMovie>({} as IMovie);

  useEffect(() => {
    const randomMovie = trending[Math.floor(Math.random() * trending.length)];
    setMovie(randomMovie);
  }, [trending]);

  return (
    <div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:justify-center">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <Image
          src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.title || movie?.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="py-[4px] px-[8px] text-center rounded-tr-[8px] rounded-bl-[8px] bg-[#1d1d1d]/50 w-[111px]">
        {movie?.media_type}
      </div>
      <div className="flex items-center space-x-2">
        <ReactStars
          edit={false}
          count={10}
          value={movie?.vote_average}
          color2={"#FFF"}
        />
        <p>({movie?.vote_count})</p>
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title ||
          movie?.name ||
          movie?.original_name ||
          movie?.original_title}
      </h1>
      <p className="max-w-xs md:max-w-lg lg:max-w-2xl text-xs md:text-lg lg:text-2xl text-shadow-md">
        {movie?.overview?.slice(0, 100)}...
      </p>
      <div>
        <button className="bg-white/60 font-bold text-black w-[200px] h-[56px] rounded-full flex justify-center items-center gap-2">
          <TbPlayerPlay className="w-5 h-5 md:h-6 md:w-6" />
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
