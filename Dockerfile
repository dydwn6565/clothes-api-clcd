FROM node

WORKDIR /app

COPY . .

RUN npm install

COPY . .

EXPOSE 80

CMD ["node", 'index.js']