FROM node:18

RUN npm install -g typescript

RUN npm install -g ts-node

COPY . /app 

COPY package*.json ./

RUN npm install

COPY . . 
 
ENV PORT=8000

EXPOSE 8000

CMD ["npm", "start"]