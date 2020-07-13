FROM continuumio/miniconda:latest

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
RUN apt-get update && apt-get upgrade -y && apt-get install -qqy wget

RUN curl -sL https://deb.nodesource.com/setup_13.x | bash - && apt-get install -y nodejs && apt-get install -y npm

RUN mkdir -p /backend
COPY ./backend/requirements.yml /backend/requirements.yml

RUN /opt/conda/bin/conda env create -f /backend/requirements.yml

ENV PATH /opt/conda/envs/bloodv_backend/bin:$PATH
RUN echo "source activate bloodv_backend" >~/.bashrc

RUN mkdir -p /scripts
COPY ./scripts /scripts
RUN chmod +x /scripts/*

COPY ./backend /backend

RUN mkdir -p /frontend
RUN mkdir -p /frontend_tmp
COPY ./frontend /frontend_tmp
WORKDIR /frontend_tmp
RUN npm i
RUN npm run build

WORKDIR /backend
