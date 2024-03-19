import pymongo
from pymongo import MongoClient

class DBService:
  _db: pymongo.database.Database

  def __init__(self):
    client = MongoClient(
          host='mdb_simple_nodes',
          port=27017, 
          username='root', 
          password='root',
          authSource="admin"
        )
    self._db = client["logs_db"]

  def get_db(self):
    return self._db
  
  def _pegar_colecao(self, nome_colecao):
    return self._db[nome_colecao]
  
  def _inserir(self, nome_colecao, data):
    collection = self._pegar_colecao(nome_colecao)
    collection.insert_one(data)

  def inserir_log(self, data):
    self._inserir("logs", data)

  def obter_logs(self):
    collections = self._pegar_colecao("logs")
    _logs = collections.find()
    logs = [{"data": log["data"], "hora_envio": log["hora_envio"], "ip_origem": log["ip_origem"]} 
            for log in _logs]
    return logs

