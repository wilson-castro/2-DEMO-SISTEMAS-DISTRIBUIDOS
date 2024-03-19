import socket
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from db import DBService


app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Instanciar o serviço de banco de dados
db_service = DBService()

@app.route('/armazenar', methods=['POST'])
@cross_origin()
def armazenar():
  """
  Rota para armazenar informações de requisições.

  Recebe uma requisição JSON e a armazena na lista interna.
  Retorna a lista completa com a resposta da requisição.
  """
  
  # Obter dados passados na requisição
  dados_requisicao = request.get_json()

    # Extrair informações da requisição
  hora_envio = datetime.now()
  ip_origem = request.remote_addr

  dados_requisicao['hostname'] = socket.gethostname()

  # Criar objeto com informações da requisição
  dados = {
    "data": dados_requisicao,
    "hora_envio": hora_envio,
    "ip_origem": ip_origem,
  }

  # Inserir log no banco de dados
  db_service.inserir_log(dados)

  # Retornar a lista completa
  logs = db_service.obter_logs()
  return jsonify(logs)

@app.route('/obter', methods=['GET'])
@cross_origin()
def obter():
  """
  Rota para obter a lista completa de informações de requisições.

  Retorna a lista completa com a resposta da requisição.
  """
  logs = db_service.obter_logs()
  return jsonify(logs)


if __name__ == '__main__':
  app.run(debug=True)