FROM node:15-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]