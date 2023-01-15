# Install dependencies only when needed
FROM node:18.13.0-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:18.13.0-alpine3.15 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run nx run site:build:production
RUN cd dist/apps/site && npm install --only=production

# Production image, copy all the files and run next
FROM node:18.13.0-alpine3.15 AS runner
LABEL org.opencontainers.image.source https://github.com/vujita/nx-next-starter

WORKDIR /app

ENV NODE_ENV production
ARG PORT=4200
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/dist/apps/site .

USER nextjs

ENV PORT ${PORT}
EXPOSE ${PORT}

CMD ["npm", "start"]
