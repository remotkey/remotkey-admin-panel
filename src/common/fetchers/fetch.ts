import "server-only";

import {
  ApiResponse,
  FetchParameters,
  OptionsType,
  ResponseData,
} from "./interface";

export const fetchGenerator = async (
  parameters: FetchParameters
): Promise<ApiResponse> => {
  try {
    const { method, url, token, payload, params } = parameters;
    const API_BASE_URL = process.env.API_BASE_URL;

    const headers: Record<string, string> = {};

    if (payload instanceof FormData) {
      // When using FormData, do not set "Content-Type" since the browser will set it automatically
    } else {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options: OptionsType = {
      method,
      headers,
    };

    if (payload) {
      if (payload instanceof FormData) {
        options.body = payload;
      } else {
        options.body = JSON.stringify(payload);
      }
    }

    let finalUrl = url;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      finalUrl = `${url}?${queryString}`;
    }

    const res = await fetch(`${API_BASE_URL}${finalUrl}`, options);
    const resData: ResponseData = await res?.json();
    return {
      data: resData?.data,
      message: resData?.meta?.message,
      code: resData?.meta?.code,
      meta: resData?.meta,
      token: resData?.meta?.token,
    };
  } catch (err: any) {
    return {
      data: null,
      message: err?.message,
      code: 500,
      token: null!,
      meta: null,
    };
  }
};
