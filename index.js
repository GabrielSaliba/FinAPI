const { response } = require("express");
const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerExists = customers.some((customer) => customer.cpf === cpf);

  if (customerExists) {
    return response.status(400).json({ error: "Usuário já existe!", cpf: cpf });
  }

  customers.push({
    cpf,
    name,
    id: uuid(),
    statement: [],
  });

  return response.status(201).send(["Usuário criado!", customers]);
});

app.get("/statement/:cpf", (request, response) => {
  const { cpf } = request.params;

  const customer = customers.find((customer) => customer.cpf === cpf);

  return response.json(customer.statement);
});

app.listen(3333);
