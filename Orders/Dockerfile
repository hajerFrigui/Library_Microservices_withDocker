FROM node:alpine3.11
WORKDIR /app
COPY . .
RUN npm install --no-cache
EXPOSE 7777
ENTRYPOINT [ "npm","start" ]