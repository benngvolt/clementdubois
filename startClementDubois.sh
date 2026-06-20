#!/bin/bash

# Arrêt et suppression de l'ancien conteneur
echo "🧼 Suppression de l'ancien conteneur..."
docker rm -f clement_backend 2>/dev/null || true

# Build backend
echo "🔧 Build du backend..."
docker build -t clement_backend ./backend

# Crée le dossier uploads s'il n'existe pas
mkdir -p ./uploads

# Lancement du backend
echo "🚀 Lancement du backend (port 3006)..."
docker run -d \
  -p 3006:3000 \
  -v $(pwd)/uploads:/usr/src/app/uploads \
  --name clement_backend \
  --restart unless-stopped \
  --env-file ./backend/env/.env \
  clement_backend

echo "✅ Backend disponible sur : http://apicldub.bengibert.com:3006"