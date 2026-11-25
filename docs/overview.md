---
title: Nyte Server
sidebar_position: 1
slug: /
---

# Nyte Server

Nyte Server is the self-hosted backend for Nyte, built with
Node.js, TypeScript, and NestJS.

This section will document server configuration, architecture,
deployment, development, and plugin integration.

[View source on GitHub](https://github.com/use-nyte/nyte-server).

## Running the server

Install dependencies and start the development server:

```bash
pnpm install
pnpm run dev
```

The server listens on `127.0.0.1:52470` by default.

The following environment variables control networking:

| Variable | Default     | Description                    |
| -------- | ----------- | ------------------------------ |
| `HOST`   | `127.0.0.1` | Network interface to listen on |
| `PORT`   | `52470`     | HTTP listening port            |

For container deployments, set `HOST=0.0.0.0`.

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
