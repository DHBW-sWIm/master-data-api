# installing node version 10
FROM node:12

#assign wirking directory
WORKDIR /usr/src/app

# copy all package* from the 
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9090

ENV PORT=9090

CMD ["npm", "run", "start"]