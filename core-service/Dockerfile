FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm ci

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

COPY --from=development /usr/src/app/dist ./dist

ENV MONGODB_HOST=momtaz-db
ENV REDIS_HOST=momtaz-redis
ENV DASHBOARD_HOSTNAME=localhost

CMD ["npm", "run", "start:prod"]