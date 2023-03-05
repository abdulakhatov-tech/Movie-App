import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiBellMinus } from "react-icons/bi";
import { AuthContext } from "src/context/auth.context";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${scrolled && "bg-[#141414] shadow-lg"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={56}
          height={56}
          className="cursor-pointer object-contain"
        />

        <ul className="space-x-4 md:flex hidden">
          <li className="navLink">Home</li>
          <li className="navLink">Movies</li>
          <li className="navLink">Tv Shows</li>
          <li className="navLink">New</li>
          <li className="navLink">Popular</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <AiOutlineSearch className="w-6 h-6 cursor-pointer" />
        <p className="hidden lg:inline">Kids</p>
        <BiBellMinus className="w-6 h-6 cursor-pointer" />
        <Link href={"/account"}>
          <AiOutlineUser className="w-6 h-6 cursor-pointer" />
        </Link>
        <AiOutlineLogout className="w-6 h-6 cursor-pointer" onClick={logOut} />
      </div>
    </header>
  );
};

export default Header;
