# Demonstração de Arquiteturas de Sistemas Distribuídos

Este projeto consiste em demonstrar duas arquiteturas de sistemas distribuídos, com o objetivo de ilustrar a diferença entre uma arquitetura com sobrecarga e outra que distribui o trabalho em várias instâncias para evitar essa sobrecarga.


## Arquitetura 1: Ambiente de Dois Nós


Nesta arquitetura, temos um frontend e um backend. O cliente frontend faz uma série de requisições para o backend, que as processa, salva os registros em uma lista em memória e retorna todos os logs de registro de requisições para o frontend. O frontend então exibe esses registros em uma tabela.

## Arquitetura 2: Distribuição de Carga em Múltiplas Instâncias

Nesta arquitetura, introduzimos um proxy NGINX para distribuir a carga de trabalho em cinco instâncias do backend. Os registros de logs são armazenados em um banco de dados MongoDB.

Tecnologias Utilizadas:
- Frontend: React, Typescript, Material UI
- Backend: Flask (executando em cinco instâncias)
- Banco de Dados: MongoDB
- Servidor para o Frontend e para o Proxy: NGINX

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:
- `two-nodes/`: Pasta contendo a demonstração da Arquitetura 1
- `n-loading-with-loading-balance/`: Pasta contendo a demonstração da Arquitetura 2
- `run.bash`: Script para implantação das demonstrações e exibição dos links dos clientes para verificar a execução

## Como Executar

### Demonstração 1
Para executar a Demonstração 1, navegue até a pasta `two-nodes/` e execute o comando `ocker-compose up --build -d`.

### Demonstração 2
Para executar a Demonstração 2, navegue até a pasta `n-loading-with-loading-balance/` e execute o comando `ocker-compose up --build -d --scale app=5`.

### Ambas
Para executar ambas as demonstrações simultaneamente, navegue até a pasta raiz onde está localizado o arquivo `run.bash` e execute `sh run.bash`.

