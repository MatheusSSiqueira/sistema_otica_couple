FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src

RUN apk add --no-cache wget

COPY OticaCouple.Api.csproj ./
RUN dotnet restore ./OticaCouple.Api.csproj
RUN dotnet tool install --global dotnet-ef --version 8.0.0

ENV PATH="${PATH}:/root/.dotnet/tools"

COPY . ./
RUN dotnet publish ./OticaCouple.Api.csproj -c Release --no-restore -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080

RUN apk add --no-cache wget

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/publish .
RUN chown -R appuser:appgroup /app

USER appuser

HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=12 CMD wget -qO- http://127.0.0.1:8080/health || exit 1

ENTRYPOINT ["dotnet", "OticaCouple.Api.dll"]
