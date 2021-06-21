//const express = require('express');
import express from "express"; //... precisa instalar as tipagens para o autocomplete   =>   yarn add @types/express -D

const app = express();

/* 
  GET    => Buscar uma informacao
  POST   => Inserir uma informacao
  PUT    => Alterar uma informacao
  DELETE => Remover uma informacao
  PATCH  => Alterar informacao especifica
*/

app.get('/test', (req, res) => {
    // Request => Entrando
    // Response => Saindo
    return res.send('Ola NLW')
})

app.post('/test-post', (req, res) => {
    return res.send('Ola NLW metodo POST') //da errado no browser pois so usa o GET, usar o postman
})

app.listen(3000, () => {
    console.log('Server is running!')
})
