FROM python:3.12-rc-slim-buster

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r  requirements.txt

CMD gunicorn --bind 0.0.0.0:5001 app:app