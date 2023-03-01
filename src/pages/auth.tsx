import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

export const Auth = () => {
  const [auth, setAuth] = useState<"signin" | "signup">("signin");

  const toggleAuth = (state: "signin" | "signup") => {
    setAuth(state);
  };
  return (
    <>
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="For watching movies, you should sign in"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={70}
          height={70}
          className="absolute left-4 top-4 cursor-pointer object-contain"
        />

        <form
          action=""
          className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:mx-14">
          <h1 className="text-4xl font-semibold">
            {auth === "signin" ? "Sign In" : "Sign Up"}
          </h1>
          <div className="space-y-4">
            <label htmlFor="email" className="inline-block w-full">
              <input
                type="text"
                placeholder="Email"
                className="input"
                autoComplete="off"
                id="email"
              />
            </label>
            <label htmlFor="password" className="inline-block w-full">
              <input
                type="password"
                placeholder="Password"
                className="input"
                autoComplete="off"
                id="password"
              />
            </label>

            {auth === "signin" ? (
              <button
                type="submit"
                className="w-full bg-[#E10856] py-3 font-semibold">
                Sign In
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#E10856] py-3 font-semibold">
                Sign Up
              </button>
            )}

            {auth === "signin" ? (
              <div className="text-[gray]">
                {"Don't have an account yet ?"}
                <button
                  type="button"
                  onClick={() => toggleAuth("signup")}
                  className="text-white ml-2 hover:underline">
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="text-[gray]">
                {"Already have an account ?"}
                <button
                  type="button"
                  onClick={() => toggleAuth("signin")}
                  className="text-white ml-2 hover:underline">
                  Sign In
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
