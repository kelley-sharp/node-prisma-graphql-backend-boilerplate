import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/shared/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        nonOptionalTypename: true,
        scalars: {
          ID: "number",
          DateTime: "string",
        },
        withComponent: false,
        withHOC: false,
        withHooks: true,
        reactApolloVersion: 3,
        gqlImport: "@apollo/client#gql",
      },
    },
    "src/shared/graphql/possible-types.json": {
      plugins: ["fragment-matcher"],
    },
    "src/shared/graphql/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
