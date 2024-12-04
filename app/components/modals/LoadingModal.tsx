"use client";

import Modal from "./Modal";
import React, { useEffect, useState } from "react";
import useLoadingModal from "../hooks/useLoadingModal";
import apiService from "@/app/service/apiService";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/lib/actions";
import { is } from "date-fns/locale";

interface LoadingModalProps {
  code: string | string[];
}
interface Response {
  user_id: string;
  token: string;
  refresh_token: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ code }) => {
  const loginModal = useLoadingModal();
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("Loading...");
  const router = useRouter();

  const close = () => {
    loginModal.close();
    setLoading(false);
    router.push("/");
  }
  console.log(code);
  const fetchApiData = async () => {
    try {
      const response = await apiService.get<Response>(
        `/api/auth/google/?code=${code}`
      );
      console.log("Response aq", response.status);
      if (response.status == 200) {
        handleLogin(
          response.data.user_id,
          response.data.token,
          response.data.refresh_token
        );
        loginModal.close();
        router.push("/");
      } else {
        setLabel("Acesso negado ou erro na resposta");

      }
    } catch (error) {
      setLabel(`Erro: ${error}`); 
    } 
  };
  const content = (
    <div className="flex justify-center">
      <ClipLoader color="#000" loading={true} size={20} />
    </div>
  );
  return (
    <Modal
      label={label}
      content={content}
      isOpen={loginModal.isOpen}
      close={close}
      onOpen={fetchApiData}
    />
  );
};

export default LoadingModal;
