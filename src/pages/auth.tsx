import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { TextField } from "src/components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useAuth } from "src/hooks/useAuth";

export const Auth = () => {
  const [auth, setAuth] = useState<"signin" | "signup">("signin");
  const { error, isLoading, signIn, signUp, user, setIsLoading } = useAuth();
  const router = useRouter();

  // if (!isLoading) return <>Loading...</>;
  if (user) {
    router.push("/");
  }

  const toggleAuth = (state: "signin" | "signup") => {
    setAuth(state);
  };

  const onSubmit = async (formData: { email: string; password: string }) => {
    if (auth === "signup") {
      setIsLoading(true);
      const response = await fetch("/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      await response.json();
      signUp(formData.email, formData.password);
    } else {
      signIn(formData.email, formData.password);
    }
  };

  const validation = Yup.object({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "6 minimum character")
      .required("Password is required"),
  });

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center bg-black md:bg-transparent">
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="For watching movies, you should sign in"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src={"https://rb.gy/p2hphi"}
        alt={"bg"}
        fill
        className="object-cover -z-10 !hidden sm:!inline opacity-5"
      />

      <Image
        src={"/logo.svg"}
        alt="logo"
        width={70}
        height={70}
        className="absolute left-4 top-4 cursor-pointer object-contain"
      />

      <div className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-10 ">
        <h1 className="text-4xl font-semibold">
          {auth === "signin" ? "Sign In" : "Sign Up"}
        </h1>
        {error && (
          <p className="text-red-500 font-semibold text-center">{error}</p>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={validation}>
          <Form>
            <div className="space-y-4">
              <TextField name="email" placeholder="Email" type="text" />
              <TextField
                name="password"
                placeholder="Password"
                type="password"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#E10856] py-4 rounded font-semibold">
                {isLoading
                  ? "Loading..."
                  : auth === "signin"
                  ? "Sign In"
                  : "Sign Up"}
              </button>

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
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Auth;
