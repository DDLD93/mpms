FROM node:alpine
LABEL Khalil Mohammed Shams <shamskhalil@gmail.com>
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src ./
CMD ["node", "server.js"]
EXPOSE 9000

