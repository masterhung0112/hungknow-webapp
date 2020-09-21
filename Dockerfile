FROM node:12
WORKDIR /project/hungknow-webapp
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]