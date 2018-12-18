FROM node:10

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i --production
COPY . ./

EXPOSE 80

CMD ["npm", "start"]
