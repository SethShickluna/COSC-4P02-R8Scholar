#!/bin/sh

# Author : Twino(Mathew) Puthiakunnel

cd r8scholar/
pip3 install Django==3.1.5 djangorestframework==3.12.2 django-cors-headers==3.7.0 djangorestframework-simplejwt==4.6.0
pip3 install django-rest-multiple-models
pip3 install profanity-filter
python3 -m spacy download en
pip3 install schedule
cd frontend/
npm init -y
npm install --save-dev babel-core babel-loader babel-plugin-transform-class-properties babel-preset-es2015 babel-preset-react
npm install --save css-loader style-loader url-loader file-loader webpack @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
npm install --save react react-dom react-router-dom reactstrap react-bootstrap
npm i react-icons react-icons-kit react-star-ratings react-cookies axios jquery
cd ..
python3 manage.py makemigrations api
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py shell < "./api/db_entries.py"
python3 manage.py runserver
