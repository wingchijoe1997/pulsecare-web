FROM node:18-alpine as base
ENV NEXT_TELEMETRY_DISABLED 1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED 1
# enbable corepack to use pnpm
RUN corepack enable
COPY . /pulsecare-webapp
WORKDIR /pulsecare-webapp

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Trying to freshly install prisma client every time as suggested here: https://github.com/prisma/prisma/issues/7234#issuecomment-846606919
RUN pnpm dlx prisma generate --schema=prisma/schema.prisma


FROM deps as development
# RUN ls -la node_modules/.prisma/client
ENV PORT 3000
CMD ["pnpm", "dev"]


FROM deps as production-bundle
RUN pnpm build

FROM production-bundle as production
CMD ["pnpm", "start"]

