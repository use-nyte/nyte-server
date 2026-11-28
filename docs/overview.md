---
title: Nyte Server
sidebar_position: 1
slug: /
---

# Nyte Server

Nyte Server is the self-hosted backend for Nyte, built with
Node.js, TypeScript, and NestJS.

[View source on GitHub](https://github.com/use-nyte/nyte-server).

## Install and run

Use the Node.js version pinned in `.nvmrc` and the pnpm version in `package.json`.
Sign in to GitHub Packages with your GitHub username and a classic personal
access token with `read:packages` access to install Nyte’s shared tooling.

```bash
pnpm login --registry=https://npm.pkg.github.com --scope=@use-nyte
pnpm install --frozen-lockfile
pnpm dev
```

To run the production build locally, use `pnpm build` followed by `pnpm start`.

The server listens on `127.0.0.1:52470` by default.

The following environment variables control networking:

| Variable | Default     | Description                    |
| -------- | ----------- | ------------------------------ |
| `HOST`   | `127.0.0.1` | Network interface to listen on |
| `PORT`   | `52470`     | HTTP listening port            |

For container deployments, set `HOST=0.0.0.0`.

## Development checks

Run `pnpm test` for both suites. Put unit specs in `test/unit/` and end-to-end
specs in `test/e2e/`. The HTTP suite uses Nest’s testing module and Supertest.
Add specs in `test/` when you generate a new Nest component.

| Command              | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `pnpm test:unit`     | Run the unit suite                           |
| `pnpm test:e2e`      | Run the HTTP suite                           |
| `pnpm test:watch`    | Rerun tests as files change                  |
| `pnpm test:cov`      | Generate coverage in `.generated/coverage/`  |
| `pnpm test:mutation` | Check which source mutations the tests catch |
| `pnpm typecheck`     | Check application and test types             |
| `pnpm lint`          | Check ESLint rules                           |
| `pnpm format`        | Check Prettier formatting                    |

Stryker type-checks each mutation before running Vitest. Mutations that fail
type checking appear as compile errors in `.generated/mutation/index.html`.

Use the `#server/` alias without a file extension for local TypeScript imports.
For example, `#server/app.module` resolves to `src/app.module.ts` in TypeScript
and Vitest and to `dist/app.module.js` when Node.js runs the build.

## Health checks

The server exposes a liveness endpoint:

```http
GET /health/live
```

Successful response:

```json
{
  "status": "ok"
}
```

This endpoint verifies that the HTTP application is responding.
It does not verify database, storage, or plugin readiness.

A separate readiness endpoint will be introduced when those
dependencies are implemented.
