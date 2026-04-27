FROM node:20-slim AS builder

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
COPY tsconfig.base.json ./

COPY packages/shared/package.json ./packages/shared/
COPY packages/shared/tsconfig.json ./packages/shared/
COPY packages/shared/src ./packages/shared/src/

COPY apps/api/package.json ./apps/api/
COPY apps/api/tsconfig.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma/
COPY apps/api/src ./apps/api/src/

RUN npm install --workspaces

# Generate Prisma client before compiling TypeScript
RUN cd apps/api && npx prisma generate

RUN npm run build --workspace=packages/shared
RUN npm run build --workspace=apps/api

FROM node:20-slim

RUN apt-get update && apt-get install -y openssl git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY package.json ./

# Content is fetched at startup from CONTENT_GITHUB_REPO — no baking needed.
# Set CONTENT_GITHUB_REPO env var on Render to your learnstack-platform GitHub URL.
ENV CONTENT_REPO_PATH=/app/runtime-content

WORKDIR /app/apps/api

EXPOSE 3001

CMD ["sh", "-c", "\
  echo 'Fetching content from $CONTENT_GITHUB_REPO...' && \
  git clone --depth=1 ${CONTENT_GITHUB_REPO} /app/runtime-content && \
  echo 'Content ready.' && \
  npx prisma db push && \
  node dist/index.js \
"]
