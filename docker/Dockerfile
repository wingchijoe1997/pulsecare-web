FROM node:18-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED 1
# enbable corepack to use pnpm
RUN corepack enable
# COPY . /pulsecare-webapp
WORKDIR /pulsecare-web
# Exposing port for when NOT running with docker-compose
EXPOSE 3000
# Args from .env file 


FROM base AS deps
WORKDIR /pulsecare-web
COPY package.json pnpm-lock.yaml* prisma/schema.prisma ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm dlx prisma generate --schema=schema.prisma


FROM base as development
WORKDIR /pulsecare-web
COPY --from=deps /pulsecare-web/node_modules ./node_modules
COPY --from=deps /pulsecare-web/package.json ./package.json
ENV PORT 3000
CMD ["pnpm", "dev"]


FROM base as builder
WORKDIR /pulsecare-web
COPY --from=deps /pulsecare-web/node_modules ./node_modules
COPY --from=deps /pulsecare-web/package.json ./package.json
# COPY src ./src
# COPY public ./public
# COPY next.config.mjs .
# COPY tsconfig.json .
COPY . .
ARG AUTH_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
# ARG DATABASE_URL
# ARG AUTH_URL
# ARG AUTH_SECRET
# ARG AUTH_GOOGLE_ID
# ARG AUTH_GOOGLE_SECRET
# set hostname to localhost
# ENV AUTH_SECRET=$AUTH_SECRET
RUN pnpm build


FROM base as runner
WORKDIR /pulsecare-web
ENV HOSTNAME "0.0.0.0"
# ENV DATABASE_URL=$DATABASE_URL
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID

ARG AUTH_GOOGLE_SECRET
ENV AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET

ARG AUTH_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
# ENV AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID
# ENV AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET
ENV AUTH_TRUST_URL true

RUN addgroup -g 1001 -S nodejs
RUN adduser -S runner -u 1001

USER runner

COPY --from=builder /pulsecare-web/public ./public
COPY --from=builder --chown=runner:nodejs /pulsecare-web/.next/standalone ./
COPY --from=builder --chown=runner:nodejs /pulsecare-web/.next/static ./.next/static/
COPY --from=builder --chown=runner:nodejs /pulsecare-web/public ./public

CMD node server.js

