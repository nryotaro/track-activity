FROM node:14.16.0-buster-slim
WORKDIR /root/track-activity
COPY pages/ ./pages/ 
COPY public/ ./public/
COPY package.json package-lock.json tsconfig.json ./
RUN npm install && npm run build
ENTRYPOINT [ "npm", "run", "start" ]