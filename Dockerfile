FROM node:20

RUN mkdir -p /user/src/app

WORKDIR /user/src/app

COPY package.json yarn.lock ./

RUN yarn

ADD . .

RUN yarn build

EXPOSE 8081

RUN ls

CMD [ "yarn", "start" ]