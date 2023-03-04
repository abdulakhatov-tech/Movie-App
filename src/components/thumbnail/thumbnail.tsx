import Image from "next/image";
import ReactStars from "react-stars";
import { image_base } from "src/helpers/contants";
import { useInfoStore } from "src/store";
import { ThumbnailProps } from "./thumbnail.props";

const Thumbnail = ({ movie, isBig = false }: ThumbnailProps) => {
  const { setModal, setCurrentMovie } = useInfoStore();

  const handleCurrentMovie = () => {
    setModal(true);
    setCurrentMovie(movie);
  };

  return (
    <div
      onClick={handleCurrentMovie}
      className={`relative ${
        isBig
          ? "h-[400px] md:h-[550px] md:min-w-[450px] min-w-[350px]"
          : "h-[330px] md:h-[440px] md:min-w-[292px] min-w-[200px]"
      }   cursor-pointer transition duration-200 ease-out  md:hover:scale-110`}>
      <Image
        src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie?.title || movie?.name}
        fill
        className="rounded:sm md:rounded object-cover"
      />

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30"></div>

      <div className="absolute bottom-10 left-4 right-2">
        <div className="flex items-center space-x-2">
          <ReactStars
            edit={false}
            count={10}
            value={movie?.vote_average}
            color2={"#FFF"}
          />
          <p>({movie?.vote_count})</p>
        </div>
        <h1 className="text-xl font-bold md:text-2xl ">
          {movie?.title ||
            movie?.name ||
            movie?.original_name ||
            movie?.original_title}
        </h1>
      </div>
    </div>
  );
};

export default Thumbnail;
