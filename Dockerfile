FROM node

WORKDIR /usr/src/app

COPY . .

ENV PORT=80

RUN npm install
RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]