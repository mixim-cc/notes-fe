import * as process from "process"
import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`https://mygpt-be.onrender.com/query` as string]: {
        headers: {
          schema: "true",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yUmVQdXZSZENIQnpsTG5lVGowTERLUWs0WnciLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE2ODkzODkzMjUsImlhdCI6MTY4OTM4OTI2NSwiaXNzIjoiaHR0cHM6Ly9ib2xkLWNhdHRsZS03MS5jbGVyay5hY2NvdW50cy5kZXYiLCJuYmYiOjE2ODkzODkyNTUsInNpZCI6InNlc3NfMlNhYmd0ZEFQQmt3NlVVNGlrOExubEVPcHZEIiwic3ViIjoidXNlcl8yUmVUSnBaeGFzRW5Pc2dPRXVYclRuTUVTc0kifQ.jhcoKYwH3pvr7vMvHpP922oZTC4NUWreoNRQt97f5G8PAeFBRnKEnTYMqnp-3eo55c_XjRsD_UG_SzUTcCQHHBponB4JxZt_86M9ZZiIf2_YRg9LPrBejIGVx8xzbzKCEBFfcEJNNL8dmJsIr_JJgK4MjZBNExZZTkR9r66YWE1VgHNQQQACbwMgaE44SNI4QdnayBDMnTRwyg3CFw2ouHcKieggEK-jsUeb8V6ZO9_g6r27P1XW6r6fMYAJMr9hqXeLOOJHFOa353oA9jzzbgKPOhKKbTPqo9sWGC7Oz2AqsBfXFJHqRIgOSBGMAji_Zo0Ek_9YDc2y-u0KFnunqA",
        },
      },
    },
  ],
  documents: "src/services/graphql/operations/**/*.graphql",
  generates: {
    "src/services/graphql/generated/graphql.ts": {
      plugins: [
        {
          add: {
            content: [
              "/* eslint-disable */",
              "//This Code is auto generated by graphql-codegen, DO NOT EDIT",
              "//You can update the queries or mutations in *.graphql to generate any new changes.",
            ],
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        scalars: {
          Time: "string",
          Any: "unknown",
          Cursor: "string",
          InvalidData: "Record<string, Array<string>>",
          Map: "Record<string, unknown>",
          Date: "string",
        },
        exposeDocument: true,
        exposeMutationKeys: true,
        enumsAsConst: true,
        skipTypename: true,
        inlineFragmentTypes: "combine",
        fetcher: {
          func: "./axiosHelper#useAxios",
          isReactHook: true,
        },
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
}

export default config
