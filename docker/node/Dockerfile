FROM node:18.4.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production
RUN npm install -g nodemon ts-node


COPY . .

EXPOSE ${PORT}

CMD [ "nodemon", "-L", "src/main.ts" ]