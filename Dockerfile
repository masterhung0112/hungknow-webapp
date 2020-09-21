FROM node:12
# cloudbuild use /workspace as default folder
# https://cloud.google.com/cloud-build/docs/build-config#dir
WORKDIR /workspace
COPY package*.json ./
RUN npm install
RUN cd ./node_modules/hkclient-ts && npm install && npm run prepare
RUN cd ../..
COPY . .
CMD [ "sleep", "infinity" ]