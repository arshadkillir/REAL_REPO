POS SaaS — Fully Functional Scaffold (Postgres + Docker + Stripe + Sequelize Migrations + Frontend)
===============================================================================================

This package aims to be a more complete, runnable POS SaaS scaffold. It includes:
- Backend: Express + Sequelize + JWT auth + Stripe billing (test), migrations (Sequelize CLI compatible), seeders.
- Frontend: React + Vite + Tailwind (basic) with pages: Orders, Inventory, KDS, Subscriptions, Login.
- Docker: docker-compose.yml for dev, docker-compose.prod.yml for production with nginx-proxy placeholders.
- Scripts to run migrations and seed data.

IMPORTANT: This is still a scaffold. Some integrations (real ESC/POS printers, aggregator connectors) remain as stubs.
Follow Quick Start to run locally.
