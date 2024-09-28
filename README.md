# Nest.js Microservices Project

Este proyecto consta de dos partes principales: un servicio principal Nest.js (nest-designli) y un conjunto de microservicios (nest-designli-microservices). El proyecto demuestra habilidades en desarrollo backend, microservicios, comunicación TCP, WebSockets y Docker.

## Estructura del Proyecto

```
designli-nest/
├── nest-designli/
│   └── [Proyecto principal Nest.js]
├── nest-designli-microservices/
│   ├── notification-service/
│   ├── processing-service/
│   └── index.html
└── Dockerfile
```

## nest-designli

Este proyecto principal aborda dos desafíos técnicos:

### Desafío 1: Mapeo de JSON

1. Crea un proyecto Nest.js.
2. Convierte un JSON dado en una clase.
3. Utiliza una biblioteca de mapeo para transformar el JSON original a una nueva estructura.
4. Crea un controlador con un endpoint que recibe el primer JSON y devuelve el segundo JSON como respuesta.

### Desafío 2: Análisis de Correo Electrónico

1. Utiliza `mail-parser` para analizar el contenido de un correo electrónico con archivos adjuntos.
2. Crea un controlador con un endpoint que recibe la URL o ruta de un archivo de correo electrónico como parámetro.
3. La respuesta debe ser el JSON adjunto en el correo electrónico en cualquiera de los siguientes casos:
   - Como archivo adjunto
   - Dentro del cuerpo del correo como un enlace
   - Dentro del cuerpo del correo como un enlace que lleva a una página web donde hay otro enlace al JSON real

## nest-designli-microservices

Este proyecto consta de dos microservicios y un archivo HTML para demostrar la comunicación entre servicios y WebSockets.

### processing-service

- Puerto HTTP: 3010
- Puerto TCP: 4000
- Endpoint principal: POST `/api/v1/tasks/process`
- Este servicio procesa tareas y se comunica con el notification-service.

### notification-service

- Puerto WebSocket: 3001
- Puerto TCP: 4001
- Escucha eventos `task_completed` del processing-service.
- Emite eventos WebSocket `notification` cuando se completa una tarea.

### index.html

- Archivo HTML que se conecta al WebSocket del notification-service.
- Muestra las notificaciones de tareas completadas en tiempo real.

## Cómo ejecutar el proyecto

### Usando Docker

1. Asegúrate de tener Docker instalado en tu sistema.

2. Clona el repositorio:
   ```
   git clone https://github.com/mikezxcv/designli-nest.git
   cd designli-nest
   ```

3. Construye la imagen Docker:
   ```
   docker build -t nest-microservices .
   ```

4. Ejecuta el contenedor:
   ```
   docker run -p 3000:3000 -p 3001:3001 -p 3010:3010 -p 4000:4000 -p 4001:4001 nest-microservices
   ```

5. Accede a los servicios:
   - API Gateway: http://localhost:3000/api/v1
   - Processing Service: http://localhost:3010/api/v1
   - Swagger UI (API Gateway): http://localhost:3000/docs
   - Swagger UI (Processing Service): http://localhost:3010/docs
   - WebSocket (Notification Service): ws://localhost:3001

### Ejecución local (sin Docker)

1. Instala las dependencias en cada proyecto:
   ```
   cd nest-designli && npm install
   cd ../nest-designli-microservices/notification-service && npm install
   cd ../processing-service && npm install
   ```

2. Inicia cada servicio en una terminal separada:
   ```
   # Terminal 1
   cd nest-designli && npm run start:dev

   # Terminal 2
   cd nest-designli-microservices/notification-service && npm run start:dev

   # Terminal 3
   cd nest-designli-microservices/processing-service && npm run start:dev
   ```

3. Accede a los servicios usando las mismas URLs mencionadas en la sección de Docker.

## Prueba de funcionamiento

1. Abre el archivo `index.html` en tu navegador.
2. Utiliza una herramienta como Postman para enviar una solicitud POST a `http://localhost:3010/api/v1/tasks/process`.
3. Observa cómo se muestra una notificación en tiempo real en la página `index.html`.

## Documentación adicional

Para más detalles sobre la API y los endpoints disponibles, consulta la documentación Swagger:
- API Gateway: http://localhost:3000/docs
- Processing Service: http://localhost:3010/docs

## Contribución

Si deseas contribuir a este proyecto, por favor crea un fork del repositorio, realiza tus cambios y envía un pull request para su revisión.
