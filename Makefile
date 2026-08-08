COMPOSE ?= docker-compose
DATABASE_NAME ?= oticaos_dev

.PHONY: up down logs migrate seed ps

up:
	$(COMPOSE) up --build

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f --tail=200

migrate:
	$(COMPOSE) run --rm api dotnet ef database update

seed: migrate
	$(COMPOSE) exec -T postgres psql -U postgres -d $(DATABASE_NAME) -f /seed/seed.sql

ps:
	$(COMPOSE) ps
