FROM node:current-slim
WORKDIR /discord_bot
COPY package.json /discord_bot
RUN  npm install
COPY . /discord_bot
CMD ["npm", "start"]