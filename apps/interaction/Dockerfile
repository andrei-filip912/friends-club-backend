FROM node:20-slim As development

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8000

RUN pnpm run build interaction


FROM node:20-slim as production

RUN npm install -g pnpm

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install --prod

# COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/apps/interaction/main"]