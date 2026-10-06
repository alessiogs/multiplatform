const apiUrl = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type RequestOptions = Omit<RequestInit, "body"> & {
  params?: QueryParams;
  body?: unknown;
};

const buildUrl = (path: string, params?: QueryParams) => {
  const url = new URL(`${apiUrl}/${path.replace(/^\//, "")}`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

const request = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { params, body, headers, ...init } = options;

  const response = await fetch(buildUrl(path, params), {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    await throwApiError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};

async function throwApiError(response: Response) {
  const payload: { message?: string | string[] } | null = await response
    .json()
    .catch(() => null);
  const message = payload?.message;
  throw new Error(
    Array.isArray(message)
      ? message.join(", ")
      : message || "Something went wrong. Please try again.",
  );
}

const api = {
  get: <T = unknown>(
    path: string,
    params?: QueryParams,
    options?: Omit<RequestOptions, "method" | "params">,
  ) =>
    request<T>(path, {
      ...options,
      method: "GET",
      params,
    }),

  post: <T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) =>
    request<T>(path, {
      ...options,
      method: "POST",
      body,
    }),

  put: <T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) =>
    request<T>(path, {
      ...options,
      method: "PUT",
      body,
    }),

  patch: <T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) =>
    request<T>(path, {
      ...options,
      method: "PATCH",
      body,
    }),

  delete: <T = unknown>(
    path: string,
    options?: Omit<RequestOptions, "method">,
  ) =>
    request<T>(path, {
      ...options,
      method: "DELETE",
    }),
};

export default api;
