FROM node:17-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . . 
RUN npm ci 
RUN npm run build

CMD ["yarn", "start"]