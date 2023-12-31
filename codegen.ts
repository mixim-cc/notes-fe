import * as process from "process";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`https://mygpt-be.onrender.com/query` as string]: {
        headers: {
          schema: "true",
          authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yUmVQdXZSZENIQnpsTG5lVGowTERLUWs0WnciLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE2OTA3NzQ4MTksImlhdCI6MTY5MDc3NDc1OSwiaXNzIjoiaHR0cHM6Ly9ib2xkLWNhdHRsZS03MS5jbGVyay5hY2NvdW50cy5kZXYiLCJuYmYiOjE2OTA3NzQ3NDksInNpZCI6InNlc3NfMlRKb0ZwZFFxMEkyd1JlY3p4U2tzMnpnSDl1Iiwic3ViIjoidXNlcl8yUmVUSnBaeGFzRW5Pc2dPRXVYclRuTUVTc0kifQ.MXVrd9BMRe6XBixpbty6lqPIY85brHck-gzABfqVJgRehp9aOVYD9HGVuXOeQPPIsP9wf-jRzusg7aaonz5uM0c1_dJnb-Cj947Pjjwfw_nq90AF4SFeQRk6aZkHmifGa17bQPH79G6tV_RXPYPmBT5NbJJjayCv2VKDEjgaKf8JZlMI7GBJycephSraYncsrdLhyK-5qNEEIjgTElFMocFsnckHKk6NOtN9Y0ks_JL3NlVroKkH4Zgi04r4Ao579eFpiEq-P-78yqM9KDZpjw-oAo34VfihuHQDBqjVF_G_WGBl7VSE-Jk695LbEqQs6mLwfp6GzyhwEj8vbaxMFw",
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
};

export default config;
