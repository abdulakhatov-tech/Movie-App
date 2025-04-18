import { RawProps } from "./raw.props";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import Thumbnail from "../thumbnail/thumbnail";
import { useRef, useState } from "react";

const Raw = ({ title, movies, isBig = false }: RawProps) => {
  const [moved, setMoved] = useState<Boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: "left" | "right") => {
    setMoved(true);

    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

      if (direction === "left" && scrollTo === 0) {
        setMoved(false);
      }
    }
  };

  return (
    <div className="md:h-[600px] space-y-3 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-lg mt-4 md:mt-0 md:text-2xl font-semibold text-[#e5e5e5] hover:text-white transition duration-200">
        {title}
      </h2>
      {/* Carousel */}
      <div className="group relative md:ml-2">
        <AiFillCaretLeft
          onClick={() => handleClick("left")}
          className={`${
            !moved && "hidden"
          } absolute top-0 bottom-0 left-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-125`}
        />
        {/* Thumbnail */}

        <div
          ref={carouselRef}
          className={`flex scrollbar-hide items-center ${
            !isBig && "space-x-1 md:space-x-4"
          } overflow-hidden  overflow-x-scroll`}>
          {movies?.map((movie) => (
            <Thumbnail key={movie?.id} movie={movie} isBig={isBig} />
          ))}
        </div>

        <AiFillCaretRight
          onClick={() => handleClick("right")}
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-6 w-6 cursor-pointer  opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-125`}
        />
      </div>
    </div>
  );
};

export default Raw;
