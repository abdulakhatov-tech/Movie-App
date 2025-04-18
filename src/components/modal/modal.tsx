import React, { useEffect, useState, useRef, useContext } from "react";

import MuiModal from "@mui/material/Modal";
import { useInfoStore } from "src/store";
import { FaPlay, FaTimes, FaPause } from "react-icons/fa";
import { Element } from "src/interfaces/app.interface";
import ReactPlayer from "react-player";
import { BiPlus } from "react-icons/bi";
import { BsVolumeMute, BsVolumeDown } from "react-icons/bs";
import {
  AiOutlineLike,
  AiFillFastForward,
  AiOutlineFullscreen,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { MdReplay10 } from "react-icons/md";
import { addDoc, collection } from "firebase/firestore";
import { AuthContext } from "src/context/auth.context";
import { useRouter } from "next/router";
import { db } from "src/firebase";
import { IconButton, Snackbar } from "@mui/material";

const Modal = () => {
  const { modal, setModal, currentMovie } = useInfoStore();
  const [trailer, setTrailer] = useState<string>("");
  const [muted, setMuted] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(true);
  const playerRef = useRef<any>(100);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleCloseS = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
  const api_key = process.env.NEXT_PUBLIC_API_KEY as string;

  const api = `${base_url}/${
    currentMovie.media_type === "tv" ? "tv" : "movie"
  }/${currentMovie.id}/videos?api_key=${api_key}&language=en-US`;

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await fetch(api).then((res) => res.json());

      if (data?.results) {
        const index = data.results.findIndex(
          (el: Element) => el.type === "Trailer"
        );
        setTrailer(data?.results[index]?.key);
      }
    };

    fetchVideoData();
    // eslint-disable-next-line
  }, [currentMovie]);

  const addProductList = async () => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "list"), {
        userId: user?.uid,
        product: currentMovie,
      });
      setIsLoading(false);
      router.replace(router.asPath);
      setOpen(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoading(false);
    }
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseS}>
        <AiOutlineCloseCircle className="w-7 h-7" />
      </IconButton>
    </>
  );

  return (
    <MuiModal
      open={modal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseS}
          message="SUCCESS"
          action={action}
        />
        <button
          onClick={() => setModal(false)}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]">
          <FaTimes />
        </button>

        <div className="relative pt-[55%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width={"100%"}
            height={"100%"}
            playing={playing}
            muted={muted}
            ref={playerRef}
            style={{ position: "absolute", top: "0", left: "0" }}
          />

          <div className="absolute bottom-10 left-10 flex w-full items-center justify-between px-18">
            <div className="flex space-x-2">
              {!playing ? (
                <button
                  onClick={() => setPlaying(true)}
                  className="flex items-center gap-[5px] rounded bg-white px-8 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                  <FaPlay className="h-7 w-7 text-black" />
                  Play
                </button>
              ) : (
                <button
                  onClick={() => setPlaying(false)}
                  className="flex items-center gap-[5px] rounded bg-white px-8 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                  <FaPause className="h-7 w-7 text-black" />
                  Pause
                </button>
              )}
              <button
                onClick={() =>
                  playerRef.current.seekTo(
                    playerRef.current.getCurrentTime() - 10
                  )
                }
                className="modalButton">
                <MdReplay10 className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  playerRef.current.seekTo(
                    playerRef.current.getCurrentTime() + 10
                  )
                }
                className="modalButton ">
                <MdReplay10 className="w-6 h-6 -rotate-[180deg]" />
              </button>

              <button className="modalButton" onClick={addProductList}>
                {isLoading ? "..." : <BiPlus className="w-6 h-6" />}
              </button>

              <button className="modalButton">
                <AiOutlineLike className="w-6 h-6" />
              </button>
              <button
                className="modalButton"
                onClick={() => setMuted((prev) => !prev)}>
                {muted ? (
                  <BsVolumeMute className="w-6 h-6" />
                ) : (
                  <BsVolumeDown className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {currentMovie!.vote_average * 10}% Match
              </p>
              <p className="font-light">{currentMovie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
