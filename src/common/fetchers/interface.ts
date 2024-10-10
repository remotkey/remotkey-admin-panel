export interface OptionsType {
  method: string;
  headers: Record<string, string>;
  body?: any;
}

export interface FetchParameters {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  token: string;
  payload?: any;
  params?: any;
}

export interface ResponseData {
  data: any[] | null;
  meta: {
    code: number;
    message: string;
    token?: string;
  };
}

export interface ApiDataMessageResponse {
  data: any | null;
  meta: any | null;
  message: string;
}

export interface ApiResponse extends ApiDataMessageResponse {
  code: number;
  token?: string;
}
