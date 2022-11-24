FROM node:14
WORKDIR /app-exemplo
ARG PORT=6000
ENV
EXPOSE $PORT
COPY . .
RUN npm install
ENTRYPOINT npm start