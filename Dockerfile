FROM 14.16.0-buster-slim
WORKDIR /root
ADD pages public package.json package-lock.json tsconfig.json ./
RUN npm run build
ENTRYPOINT [ "npm", "run", "start" ]