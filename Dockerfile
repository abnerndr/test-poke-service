# syntax=docker/dockerfile:1.7
# Stage 1: Build
FROM node:22-alpine AS builder

RUN corepack enable
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm config set store-dir /pnpm/store
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Keep only prod dependencies for the final image
RUN pnpm prune --prod

# Stage 2: Production

FROM node:22-alpine AS production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R nestjs:nodejs /app


USER nestjs

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

CMD ["node", "dist/main.js"]