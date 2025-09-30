FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production || true
COPY . .
EXPOSE 5173
CMD ["npm","run","preview"]
