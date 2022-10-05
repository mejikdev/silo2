FROM node:16-alpine

WORKDIR /home/silo/siko2

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]