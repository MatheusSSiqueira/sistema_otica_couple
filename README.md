# Ótica Couple

![ASP.NET Core 8](https://img.shields.io/badge/ASP.NET_Core-8-512BD4?logo=dotnet)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=fff)
![AWS](https://img.shields.io/badge/AWS-Cloud-F79400?logo=amazon-aws&logoColor=fff)

A modern monorepo for Ótica Couple, a full-stack optical store management system focused on PDV, CRM, and AI-assisted operations.

## Overview

This repository is organized as a multi-platform product suite:

- `api` for the backend platform and business services
- `web` for the browser-based operational experience
- `mobile` for on-the-go staff workflows
- `infra` for AWS infrastructure as code

## Architecture

- Backend: ASP.NET Core 8
- Web: React 18, TypeScript, Vite
- Mobile: React Native, Expo
- Infrastructure: Terraform on AWS
- Data and services: PostgreSQL, Redis, Docker

## Getting Started

1. Install prerequisites for your target platform.
2. Open the repository in VS Code.
3. Configure environment variables for local development.
4. Start the required services with Docker Compose.

## Running Locally

```bash
docker compose up --build
```

Suggested local ports:

- API: `http://localhost:5000`
- Adminer: `http://localhost:8080`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

Useful Make targets:

- `make up`
- `make down`
- `make logs`
- `make migrate`
- `make seed`
- `make ps`

## Contributing

1. Create a feature branch.
2. Keep changes scoped to one area when possible.
3. Follow the formatting rules in `.editorconfig`.
4. Open a pull request with a clear summary and validation notes.
