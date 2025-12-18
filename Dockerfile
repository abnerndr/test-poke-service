# Stage 1: Build
FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --force

COPY . .

RUN pnpm run build

# Stage 2: Production

FROM node:22-alpine AS production

RUN npm install -g pnpm

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile && \
    pnpm store prune

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package.json ./package.json

RUN chown -R nestjs:nodejs /app


USER nestjs

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

CMD ["pnpm", "start:prod"]