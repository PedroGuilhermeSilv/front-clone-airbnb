"use server";
import { cookies } from "next/headers";

export async function handleRefreshToken() {

  const refreshToken = await getRefreshToken();

  const token = await fetch("http://localhost:8000/api/auth/token/refresh/", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  }).then(response => response.json()).then((json) => {

    if (json.access) {
      cookies().set("session_access_token", json.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });

      return json.access;
    } else {
      return undefined;
    }
  }).catch((error) => {
    return undefined;
  });

  return token;

}

export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string
) {
  cookies().set("session_userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  cookies().set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
  });
  cookies().set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function resetAuthCookies() {
  cookies().set("session_userId", "");
  cookies().set("session_access_token", "");
  cookies().set("session_refresh_token", "");
}

export async function getUserId() {
  const userId = cookies().get("session_userId");
  return userId ? userId.value : undefined;
}

export async function getAccessToken() {
  let token = cookies().get("session_access_token")?.value;
  if (!token) {
    token = await handleRefreshToken();
  }
  return token ? token : undefined;
}

export async function getRefreshToken() {
  const refreshToken = cookies().get("session_refresh_token")?.value;

  return refreshToken ? refreshToken : undefined;
}
