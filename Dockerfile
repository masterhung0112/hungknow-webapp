FROM node:12
# cloudbuild use /workspace as default folder
# https://cloud.google.com/cloud-build/docs/build-config#dir
WORKDIR /workspace
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "sleep", "infinity" ]