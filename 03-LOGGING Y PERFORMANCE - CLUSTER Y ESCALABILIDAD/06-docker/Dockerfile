FROM node:20.18.0
WORKDIR /app
COPY package*.json ./
# COPY .env .env
COPY . .
RUN npm install
# RUN npm install --only-production   #ignora las devDependencies 
EXPOSE 8080
CMD ["npm", "start"]
