from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Lista interna para armazenar informações de requisições
requisicoes = []

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

  # Criar objeto com informações da requisição
  dados = {
    "data": dados_requisicao,
    "hora_envio": hora_envio,
    "ip_origem": ip_origem,
  }

  # Adicionar dados à lista
  requisicoes.append(dados)

  # Retornar a lista completa
  return jsonify(requisicoes)

@app.route('/obter', methods=['GET'])
@cross_origin()
def obter():
  """
  Rota para obter a lista completa de informações de requisições.

  Retorna a lista completa com a resposta da requisição.
  """
  # Retornar a lista completa
  return jsonify(requisicoes)


if __name__ == '__main__':
  app.run(debug=True)