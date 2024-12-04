"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import useSingupModal from "../hooks/useSingupModal";
import Modal from "./Modal";

import Image from "next/image";
import apiService from "../../service/apiService";
import { handleLogin } from "@/app/lib/actions";

const SingupModal = () => {
  const router = useRouter();
  const singupModal = useSingupModal();

  const [errors, setError] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const loginGoogle = async () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&prompt=consent&response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE}&scope=openid%20email%20profile&access_type=offline`;
    router.push(url);
    console.log(url);
  };

  const submitSingup = async () => {
    const formData = {
      email: email,
      password1: password1,
      password2: password2,
      name: name,
    };
    const response = await apiService.post(
      "/api/auth/register/",
      JSON.stringify(formData),
      "application/json",
      "application/json"
    );

    console.log("response");
    console.log(response);
    if (response.user_id) {
      const response = await apiService.post(
        "/api/auth/login/",
        JSON.stringify({
          email: email,
          password: password1,
        }),
        "application/json",
        "application/json"
      );
      handleLogin(response.user.pk, response.access, response.refresh);
      singupModal.close();
      router.push("/");
      router.refresh();
    } else {
      const tmpErros: string[] = Object.values(response).map((error: any) => {
        return error;
      });
      setError(tmpErros);
    }
  };

  const content = (
    <div className=" space-y-4">
      <form action={submitSingup} className="space-y-5">
        <input
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-gray-100 w-full  h-[54px] p-3"
          placeholder="Text your username"
          type="text"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-gray-100 w-full  h-[54px] p-3"
          placeholder="Text your email"
          type="email"
        />
        <input
          onChange={(e) => setPassword1(e.target.value)}
          className="rounded-xl border border-gray-100 w-full h-[54px] p-3"
          placeholder="Text your password"
          type="password"
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          className="rounded-xl border border-gray-100 w-full h-[54px] p-3"
          placeholder="Repeat your password"
          type="password"
        />
        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className=" border p-4 rounded-xl text-white bg-airbnb-dark opacity-40"
            >
              <p> {error}</p>
            </div>
          );
        })}

        <CustomButton label="Submit" onClick={submitSingup} />
        <div
          onClick={loginGoogle}
          className="flex flex-row justify-center border rounded-xl border-gray-300 p-1 cursor-pointer hover:bg-gray-200"
        >
          <div className="google-icon-wrapper ">
            <Image
              width={30}
              height={30}
              className=""
              src="/icons8-google-48.png"
              alt="Google logo"
            />
          </div>
          <p className="btn-text mt-1">
            <b>Sign in with Google</b>
          </p>
        </div>
      </form>
    </div>
  );
  return (
    <Modal
      label="Sing up"
      content={content}
      isOpen={singupModal.isOpen}
      close={singupModal.close}
    />
  );
};

export default SingupModal;
