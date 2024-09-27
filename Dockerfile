# Usa una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si está disponible)
COPY nest-designli/package*.json ./nest-designli/
COPY nest-designli-microservices/notification-service/package*.json ./nest-designli-microservices/notification-service/
COPY nest-designli-microservices/processing-service/package*.json ./nest-designli-microservices/processing-service/

# Instala las dependencias para cada proyecto
RUN cd nest-designli && npm install
RUN cd nest-designli-microservices/notification-service && npm install
RUN cd nest-designli-microservices/processing-service && npm install

# Copia el resto de los archivos de la aplicación
COPY nest-designli ./nest-designli
COPY nest-designli-microservices ./nest-designli-microservices

# Expone los puertos necesarios
# API Gateway
EXPOSE 3000
# Notification Service WebSocket
EXPOSE 3001
# Processing Service HTTP
EXPOSE 3010
# Notification Service TCP
EXPOSE 4001
# Processing Service TCP
EXPOSE 4000

# Copia el archivo index.html
COPY nest-designli-microservices/index.html ./nest-designli-microservices/

# Comando para iniciar todos los servicios
CMD ["sh", "-c", "cd nest-designli && npm run start & cd nest-designli-microservices/notification-service && npm run start & cd nest-designli-microservices/processing-service && npm run start"]