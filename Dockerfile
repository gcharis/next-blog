FROM node:12-alpine

RUN mkdir /project
WORKDIR /project

COPY package*.json ./
RUN npm i

ENV EXT_API_HOST=https://admin.gcharis.com
COPY . ./
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]