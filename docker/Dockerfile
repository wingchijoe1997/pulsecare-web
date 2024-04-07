FROM node:18-alpine as base
ENV NEXT_TELEMETRY_DISABLED 1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# enbable corepack to use pnpm
RUN corepack enable
COPY . /pulsecare-webapp
WORKDIR /pulsecare-webapp

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm exec next telemetry disable
# Trying to freshly install prisma client every time as suggested here: https://github.com/prisma/prisma/issues/7234#issuecomment-846606919
RUN pnpm add prisma @prisma/client
RUN DEBUG='*' pnpm dlx prisma generate

FROM deps as production-bundle
RUN pnpm build

FROM deps as development
EXPOSE 3000
CMD ["pnpm", "dev"]


FROM production-bundle as production
EXPOSE 3000
CMD ["pnpm", "start"]

