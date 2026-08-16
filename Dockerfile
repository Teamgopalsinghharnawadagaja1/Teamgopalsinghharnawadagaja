FROM node:24-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY client/package*.json ./client/
RUN npm install --prefix client
COPY . .
RUN npm run build --prefix client
EXPOSE 3000
CMD ["npm","start"]