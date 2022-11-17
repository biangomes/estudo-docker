# Definindo a criacao da imagem
FROM node:16
WORKDIR /app-node
COPY . .
RUN npm install /app-node
ENTRYPOINT npm start