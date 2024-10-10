import "server-only";

// ! call this fetchers only from server components/route handlers/middleware
import { cookies } from "next/headers";
import { FetchApiMethod } from "../enums";
import { fetchGenerator } from "./fetch";

export const getToken = (): string => {
  const cookieStore = cookies();
  const token = cookieStore?.get("token")?.value || "";

  // FIXME:remove this fking piece of sh**t
  return process.env.API_TOKEN || token;
};

// ! send parameter in this sequence only
export const getFetcher = async (url: string, params?: any) =>
  fetchGenerator({
    method: FetchApiMethod?.GET,
    url,
    token: getToken(),
    params,
  });

// logout api does not have an payload
export const postFetcher = async (url: string, payload?: any) =>
  fetchGenerator({
    method: FetchApiMethod?.POST,
    url,
    token: getToken() || payload?.token,
    payload,
  });

export const postFetcherWithFormData = async (url: string, payload?: any) =>
  fetchGenerator({
    method: FetchApiMethod?.POST,
    url,
    token: getToken() || payload?.token,
    payload,
  });
// payload?.token --> for signup
export const putFetcher = async (url: string, payload: any) =>
  fetchGenerator({
    method: FetchApiMethod?.PUT,
    url,
    token: getToken() || payload?.token,
    payload,
  });

export const putFetcherWithFormData = async (url: string, payload?: any) =>
  fetchGenerator({
    method: FetchApiMethod?.PUT,
    url,
    token: getToken() || payload?.token,
    payload,
  });
export const deleteFetcher = async (url: string) =>
  fetchGenerator({
    method: FetchApiMethod?.DELETE,
    url,
    token: getToken(),
  });
