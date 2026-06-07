# StyleSync - Event-Driven Microservices Architecture

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

🏗️ A comprehensive microservice event-driven architecture built with Nx monorepo, exploring CQRS patterns and microservice design principles.

## 📦 Project Overview

StyleSync is a production-ready microservices application demonstrating modern distributed architecture patterns:

- **3 Client Applications**

  - `admin` - Admin dashboard for system management
  - `pos` - Point of Sale system for retail operations
  - `web` - User-facing customer application (React)

- **Microservices**

  - `api-gateway` - Central API Gateway for routing and cross-cutting concerns
  - `auth-service` - Authentication and authorization service
  - `appointment-service` - Appointment booking and management
  - `booking-service` - General booking service
  - `inventory-service` - Inventory management service
  - `pos-service` - Backend service for POS system

- **Shared Libraries**

  - `@stylesync/shared/events` - Event definitions and publishing utilities
  - `@stylesync/shared/models` - Shared domain models across services
  - `@stylesync/shared/storage` - Database and blob storage utilities (Drizzle ORM)
  - `@stylesync/types` - TypeScript type definitions
  - `@stylesync/utils` - Shared utility functions

## �️ Tech Stack

- **Package Manager**: pnpm
- **Monorepo Tool**: Nx
- **Frontend**: React with TypeScript
- **Database**: PostgreSQL (shared database) with Drizzle ORM
- **Caching**: Redis
- **Event Publishing**: Redis Streams
- **API Gateway**: Custom API Gateway
- **Architecture Pattern**: CQRS (Command Query Responsibility Segregation)
- **Testing**: Vitest

## 🚀 Quick Start

```bash
# Install dependencies using pnpm
pnpm install

# Serve the web application
pnpm nx serve web

# Serve the admin application
pnpm nx serve admin

# Build all projects
pnpm nx run-many -t build

# Run tests
pnpm nx run-many -t test

# Lint all projects
pnpm nx run-many -t lint

# Run tasks in parallel
pnpm nx run-many -t lint test build --parallel=3

# Visualize the project graph
pnpm nx graph
```

## 🏗️ Architecture Overview

### Event-Driven Microservices Pattern

This project implements a microservice architecture with event-driven communication:

```
┌─────────────────────────────────────────────────────┐
│          Client Applications                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────────┐        │
│  │  Admin  │  │   POS   │  │   Web App   │        │
│  └────┬────┘  └────┬────┘  └─────┬───────┘        │
└───────┼────────────┼─────────────┼────────────────┘
        │            │             │
        └────────────┼─────────────┘
                     │
        ┌────────────▼──────────────┐
        │    API Gateway           │
        │  (Request Routing)        │
        └────────────┬──────────────┘
                     │
        ┌────────────┼──────────────────┐
        │            │                  │
  ┌─────▼──────┐ ┌──▼─────────┐ ┌─────▼────────┐
  │  Services  │ │  Redis     │ │  PostgreSQL  │
  │ (Products) │ │  Streams   │ │  (Shared DB) │
  │            │ │  (Events)  │ │              │
  └─────┬──────┘ └──────┬─────┘ └──────────────┘
        │               │
        │  Redis Cache  │
        └───────────────┘
```

### CQRS Pattern

Separates read and write operations for scalability and clarity:

- **Commands**: State-changing operations (Create, Update, Delete)
- **Queries**: Read-only operations (Get, List, Search)
- **Events**: Published via Redis Streams for asynchronous communication

## 📁 Project Structure

```
├── apps/
│   ├── admin/                    - Admin dashboard (TypeScript)
│   ├── pos/                      - Point of Sale client application
│   ├── web/                      - Customer-facing React application
│   ├── api-gateway/              - Central API Gateway service
│   ├── auth-service/             - Authentication & authorization service
│   ├── appointment-service/      - Appointment management service
│   ├── booking-service/          - Booking management service
│   ├── inventory-service/        - Inventory management service
│   └── pos-service/              - POS backend service
├── libs/
│   ├── shared/
│   │   ├── events/               - Event definitions & publishing
│   │   ├── models/               - Shared domain models
│   │   └── storage/              - Storage layer
│   │       ├── blob/             - Blob storage utilities
│   │       └── db/               - Database utilities (Drizzle ORM)
│   ├── types/                    - TypeScript type definitions
│   └── utils/                    - Shared utility functions
├── nx.json                       - Nx workspace configuration
├── pnpm-workspace.yaml           - pnpm workspace configuration
├── tsconfig.json                 - TypeScript configuration
└── eslint.config.mjs             - ESLint configuration
```

## 📚 Useful Commands

```bash
# Workspace exploration
pnpm nx graph                                   # Interactive dependency graph
pnpm nx list                                    # List installed plugins
pnpm nx show project web --web                 # View project details

# Development
pnpm nx serve web                              # Serve web app
pnpm nx serve admin                            # Serve admin dashboard
pnpm nx build web                              # Build web app
pnpm nx test api-products                      # Test a specific library
pnpm nx lint admin                             # Lint a specific project

# Running multiple tasks
pnpm nx run-many -t build                      # Build all projects
pnpm nx run-many -t test --parallel=3         # Test in parallel
pnpm nx run-many -t lint test build           # Run multiple targets

# Affected commands (great for CI)
pnpm nx affected -t build                      # Build only affected projects
pnpm nx affected -t test                       # Test only affected projects
```

## 🎯 Generating New Code

### Generate a new React library:

```bash
pnpm nx g @nx/react:lib my-lib --directory=libs/shared
```

### Generate a new Node library:

```bash
pnpm nx g @nx/node:lib my-lib --directory=libs/api
```

### Generate a new React component:

```bash
pnpm nx g @nx/react:component my-component --project=web
```

## 🌟 Key Features

- **Event-Driven Architecture**: Services communicate asynchronously via Redis Streams
- **CQRS Pattern**: Clear separation between command (write) and query (read) operations
- **Microservice Ready**: Individual services can be scaled and deployed independently
- **Shared Database**: PostgreSQL provides a single source of truth with CQRS queries
- **Redis Caching**: Improve performance with in-memory caching layer
- **API Gateway**: Custom gateway handles routing and cross-cutting concerns
- **Monorepo Structure**: Manage multiple applications and services in a single repository

## 📖 Learning Resources

- [Nx Documentation](https://nx.dev)
- [Microservices Architecture](https://martinfowler.com/microservices/)
- [CQRS Pattern](https://www.martinfowler.com/bliki/CQRS.html)
- [Event-Driven Architecture](https://www.martinfowler.com/articles/201701-event-driven.html)
- [Redis Streams](https://redis.io/docs/latest/develop/data-types/streams/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 💡 Development Notes

This project serves as a learning ground for understanding:
- Microservice architecture patterns
- Event-driven communication
- CQRS implementation in practice
- Monorepo management with Nx
- Distributed system design principles

## 📝 License

[Add your license here]
