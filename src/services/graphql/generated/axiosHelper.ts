import * as process from "process"
import { getAPIUrl } from "@/utils/getAPIUrlFromLocalStorage"
import { useAuth } from "@clerk/nextjs"
import axios, { AxiosRequestConfig } from "axios"

axios.defaults.withCredentials = true

export const privateAgent = axios.create({
  baseURL: getAPIUrl(),
  withCredentials: true,
})

export const useAxios = <TData, TVariables>(
  query: string
): ((variables?: TVariables, config?: AxiosRequestConfig<TData>) => Promise<TData>) => {
  const { getToken, sessionId } = useAuth()

  return async (variables?: TVariables, config?: AxiosRequestConfig<TData>) => {
    return privateAgent
      .post<{ data: TData; errors: { message: string }[] }>(
        "/query",
        { query, variables },
        {
          ...config,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )
      .then((res) => {
        if (!res.data.data || res.data.errors) {
          return { error: res.data.errors } as TData
        }

        return res.data.data
      })
  }
}

export const apiClient =
  <TData, TVariables>(
    query: string
  ): ((variables?: TVariables, config?: AxiosRequestConfig<TData>) => Promise<TData>) =>
  async (variables?: TVariables, config?: AxiosRequestConfig<TData>) =>
    privateAgent
      .post<{ data: TData; errors: { message: string }[] }>("/query", { query, variables }, config)
      .then((res) => {
        if (!res.data.data || res.data.errors) {
          return { error: res.data.errors } as TData
        }

        return res.data.data
      })
