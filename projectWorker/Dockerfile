FROM node:14-alpine
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start"]