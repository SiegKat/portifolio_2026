import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a
  .schema({
    BlogPostLike: a
      .model({
        id: a.string().required(),
        count: a.integer().required(),
      })
      .identifier(["id"])
      .authorization((allow) => [allow.publicApiKey()]),

    ProjectIndicator: a
      .model({
        id: a.string().required(),
        count: a.integer().required(),
        indicatorType: a.string().required(),
        projectId: a.string().required(),
      })
      .identifier(["id"])
      .authorization((allow) => [allow.publicApiKey()]),
  })
  .authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 365 },
  },
});
