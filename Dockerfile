FROM node:14
WORKDIR /app
COPY . .
RUN npm i -g @adonisjs/cli
RUN npm install
CMD ["adonis", "serve"]