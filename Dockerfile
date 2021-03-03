FROM node:12-alpine
WORKDIR /

COPY package*.json ./
RUN npm i

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "prod"]