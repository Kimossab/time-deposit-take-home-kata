FROM node:iron

ARG DB_CONNECTION_STRING

WORKDIR /app

# dependencies
COPY yarn.lock package.json ./

# prisma files with schema and migrations
COPY prisma prisma

# source code
COPY src src

RUN echo "DATABASE_URL=${DB_CONNECTION_STRING}" > .env

RUN yarn

CMD ["yarn", "start"]

