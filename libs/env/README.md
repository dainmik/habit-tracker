# Env

Library for handling environment variables in a centralized and type-safe way.

## Why does this exist

There are several problems with handling environment variables in each package that uses them. Every package has to handle the same concerns:

- each app has to implement their own validation for the environmnet variables they use
- multiple apps may use the same environment variables, which causes duplicated validation logic
- type inference needs to be hooked up manually for each app
- value coercion and transformation needs to be handled manually

This library encapsulates the parsing of environment variables from the process environment and their type definitions in a single place so that target apps and packages can import and use them in a composable way.

## Usage

```ts
// env.ts
import { createEnv } from "@repo/env";
import { z } from "zod";

export const env = createEnv({
	server: {
		MY_VAR: z.string().default("value"),
	},
	runtimeEnv: process.env,
});

// my_module.ts

import { env } from "./env.ts";

console.log(env.MY_VAR); // value
```
