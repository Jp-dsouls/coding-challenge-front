# Usar una imagen base de Node.js Alpine
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto en el que la aplicación va a correr
EXPOSE 5173

# Comando para ejecutar la aplicación en modo de desarrollo
CMD ["npm", "run", "dev"]