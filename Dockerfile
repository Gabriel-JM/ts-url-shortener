FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build

FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --silent --production

COPY --from=builder /usr/app/build ./build

COPY .env.example ./
COPY .env ./

EXPOSE 3200
CMD npm start
