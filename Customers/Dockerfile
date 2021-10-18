FROM node:alpine3.11
WORKDIR /app
COPY . .
RUN npm install --no-cache
EXPOSE 4000
ENTRYPOINT [ "npm","start" ]