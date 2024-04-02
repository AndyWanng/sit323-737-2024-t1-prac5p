FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3001

ENV NODE_ENV production
ENV FRONTEND_PORT=3000
ENV AUTH_PORT 3001
ENV CALCULATOR_PORT=3002
ENV JWT_SECRET_KEY asy5dna58fvfdsc325fds6


CMD [ "node", "auth-server.js" ]
