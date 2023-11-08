FROM node:slim
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

EXPOSE 6666
CMD [ "node", "server" ]