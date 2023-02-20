FROM alpine:3.15
RUN apk add --update nodejs npm
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

RUN npm install -g nodemon ts-node


COPY . .

EXPOSE ${PORT}

CMD [ "nodemon", "-L", "src/main.ts" ]