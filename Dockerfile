FROM node:16-alpine

WORKDIR /root/

COPY package.json yarn.lock ./

RUN yarn install --production=true

COPY ./dist ./dist/

COPY .env ./

CMD [ "yarn", "start" ]
