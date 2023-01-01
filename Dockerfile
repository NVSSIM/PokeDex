FROM node:16
ENV NODE_ENV=prod
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD node src/index.js
EXPOSE 80