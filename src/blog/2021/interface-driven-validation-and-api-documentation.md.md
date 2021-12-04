---
title: "Interface Driven Validation and API Documentation for Typescript"
date: "2021-11-29"
slug: "interface-driven-validation-and-api-documentation"
coverImage: "../images/tingey-injury-law-firm-veNb0DDegzE-unsplash.jpg"
---

I was working on a project recently where I wanted to have my request bodies validated at a middleware level. There are a number of ways to do this. This time I wanted to make it interface driven.

After narrowing down where my source of truth for validation was going to come from, I still had to make some choices regarding libraries. The options I was mulling over got whittled down to:

- [ts-interface-checker](https://github.com/gristlabs/ts-interface-checker) and [ts-interface-builder](https://github.com/gristlabs/ts-interface-builder)
- [zod](https://github.com/colinhacks/zod) and [ts-to-zod](https://github.com/fabien0102/ts-to-zod)

![A Stethoscope](../images/photo-1505751172876-fa1923c5c528.jpeg)

I could have just used [stethoscope](https://cmgriffing.github.io/stethoscope) to rate them and zod would have come out ahead anyway. But, the clincher for me was that I could use the zod schema to generate json schema using [zod-to-json-schema](https://github.com/StefanTerdell/zod-to-json-schema). That would allow me generate a significant part of an openapi.yaml.

It turns out that a lot of the tools regarding OpenApi and generation end up using the openapi.yml file as the source of truth. This didn't really sit well with me.

Keeping API documentation up to date is a hassle. I have come to feel that API documentation that is updated by hand is out of date the moment it is written. We all forget to update them. It can be a chore. So, making it programmatically driven in any way is a boost to productivity and morale. Something that would also allow me to treat my interfaces as the source of truth for the openapi documentation would be awesome.

![Spilled Ice Cream](../images/sarah-kilian-52jRtc2S_VE-unsplash.jpg)

There were some options that came close to what I was looking for. However, they go a bit too far. [TSOA](https://tsoa-community.github.io/docs/) and [tRPC](https://trpc.io/) both handle creating client libraries or routes themselves. These didn't really line up with the way I was using [Architect](https://arc.codes/docs/en/get-started/why-architect) to scaffold Lambda functions.

With the plan established, it came time to write some code to glue it all together. Let's take a look at how some of that code looks.

![Elmer's glue](../images/scott-sanker-IDaeLeKiie0-unsplash.jpg)

First, we have an interface for a request that we want to accept in an api endpoint:

```typescript
// request-types.ts
export interface PostPollRequest {
  teamId: string
  name: string
}
```

Next we end up running ts-to-node from the command line (or in your package.json like I did):

```bash
ts-to-zod src/shared/request-types.ts src/shared/request-schema.ts
```

This would give us a zod schema that looks like this:

```typescript
// request-schema.ts
export const postPollRequestSchema = z.object({
  teamId: z.string(),
  name: z.string(),
})
```

Then, we have to run zod-to-json-schema. It turns out it doesn't have a cli utility so we end up writing a quick little script that we can run with ts-node:

```typescript
import zodToJsonSchema from "zod-to-json-schema"
import * as requestSchemas from "../src/shared/request-schemas"
import * as fs from "fs-extra"

Object.entries(requestSchemas).forEach(([key, requestSchema]) => {
  const jsonSchema = zodToJsonSchema(requestSchema, {
    name: key,
    target: "openApi3",
  })

  fs.outputFile(`schema/${key}.json`, JSON.stringify(jsonSchema, null, 2))
})
```

We get a clean and polished OpenApi schema object. No hand editing involved.:

```json
{
  "$ref": "#/definitions/postPollRequestSchema",
  "definitions": {
    "postPollRequestSchema": {
      "type": "object",
      "properties": {
        "teamId": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": ["teamId", "name"],
      "additionalProperties": false
    }
  }
}
```

![Gears meshed together properly](../images/josh-redd-u_RiRTA_TtY-unsplash.jpg)

That schema is not quite enough to generate an entire openapi.yml file. We need route data and some metadata for the API itself. This includes path and possible responses mapped to status codes. I spent some time digging into how TSOA does things and it turns out they are using some noop Decorators in Typescript. They don't actually do anything at runtime, but they do get parsed at build time by passing the source file to the typescript library.

I won't show the whole script here but you can see the source code over at this Github repo: [https://github.com/cmgriffing/ts-driven-docs-example](https://github.com/cmgriffing/ts-driven-docs-example). It goes and parses out the metadata from the route file and it looks something like this:

```typescript
class Handler {
  @Route({
    summary: "",
    description: "",
    path: "/teams",
    headers: {
      ...commonHeaders,
    },
    method: "POST",
    requestJsonSchemaPath: "postTeamRequestSchema.json",
    responseJsonSchemaPath: "postTeamResponseSchema.json",
    errorJsonSchemaPath: "errorResponseSchema.json",
    definedErrors: [400, 500],
  })
  postTeams(req) {
    // ...
```

When it is all said and done, we get a solid openapi.yml. It doesn't have everything we need yet since this is all just proof of concept. However, I plan on polishing it a bit more and hopefully turning it into a library I can reuse. Overall, it was a cool process gluing all these things together and I hope that you can find a use for it too.
