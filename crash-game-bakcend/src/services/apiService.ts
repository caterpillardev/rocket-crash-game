import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "types";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const signUpUser = async (
  email: string,
  password: string
): Promise<ApiResponse<string>> => {
  const response: AxiosResponse<string> = await api.post("/auth/signup", {
    email,
    password,
  });
  return { data: response.data, status: response.status };
};

export const signInUser = async (
  email: string,
  password: string
): Promise<ApiResponse<string>> => {
  const response: AxiosResponse<string> = await api.post("/auth/signin", {
    email,
    password,
  });
  return { data: response.data, status: response.status };
};
