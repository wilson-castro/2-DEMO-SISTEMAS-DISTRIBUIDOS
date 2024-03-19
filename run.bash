#!/bin/bash

cd n-loading-with-loading-balance && docker-compose up --build -d --scale app=5

cd ..

cd two-nodes && docker-compose up --build -d

echo ""
docker ps -a

echo ""
tput setaf 1; echo "Excutado com sucesso 🏆"; tput sgr0
echo -e "Link para o exemplo com dois nós: \e[36mhttp://localhost:3000\e[0m"
echo -e "Link para o exemplo com balanceamento de carga: \e[36mhttp://localhost:3001\e[0m"

