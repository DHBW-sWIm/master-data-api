# installing node version 10
FROM node:12

WORKDIR /usr/src/app

# copy all package* from the 
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV url=default

CMD ["node", "server.js"]

