# installing node version 10
FROM node:12

#assign wirking directory
WORKDIR /usr/src/app

# copy all package* from the 
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV URL=default

CMD ["node", "api/server.js"]

