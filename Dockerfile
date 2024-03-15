# Utilisation d'une image de base avec Node.js pour architecture arm64
FROM node:14-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Build de l'application React
RUN npm run build

# Exposer le port 3000

# Commande pour exécuter l'application lorsque le conteneur démarre
CMD ["npm", "start"]
