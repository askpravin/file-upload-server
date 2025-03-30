FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p /app/uploads && chmod 777 /app/uploads
VOLUME ["/app/uploads"]
EXPOSE 3000
CMD ["npm", "start"]