import * as process from "process"
import axios, { AxiosRequestConfig } from "axios"

export const privateAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const useAxios =
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
