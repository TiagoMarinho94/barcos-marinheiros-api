# barcos-marinheiros-api
Web API em Node.js para reservar barcos por marinheiros
## Tecnologias utilizadas
- Node.js
- Express
- Oracle Database (oracledb)
- Celebrate/Joi (validação)
- Body-parser

## Como executar
1. Clonar o repositório
2. Executar `npm install`
3. Configurar as credenciais de acesso à base de dados em `database/barcos-marinheiros-db.js` - pro default são as minhas
4. Executar `npm start`
5. A API fica disponível em `http://localhost:8080`

## Arquitetura
O projeto segue uma arquitetura em camadas:
Route → Controller → Service → Repository → Database
- **Routes** — definem os endpoints e validam os dados com Joi
- **Controllers** — tratam os pedidos HTTP e devolvem as respostas
- **Services** — contêm a lógica de negócio
- **Repositories** — executam as queries SQL na base de dados
- **Models** — representam os objetos de dados
- **DTOs** — transformam os dados antes de os devolver ao cliente

## Testes
Os testes funcionais estão organizados em coleções no Postman e podem ser encontrados na pasta `postman/`.

## Endpoints

### Marinheiros
| US | Método | Endpoint | Descrição |
|---|---|---|---| 
| US002 | GET | /api/marinheiros | Listar todos os marinheiros |
| US004 | GET | /api/marinheiros/:id | Obter marinheiro por ID |
| US003 | GET | /api/marinheiros/classificacao/:classif | Filtrar por classificação |
| US001 | POST | /api/marinheiros | Registar marinheiro |
| US005/EXTRA | PATCH | /api/marinheiros/:id | Atualizar classificação, nome ou idade |
| US006 | DELETE | /api/marinheiros/:id | Eliminar marinheiro (só se sem reservas) |
### Barcos
| US | Método | Endpoint | Descrição |
|---|---|---|---| 
| US008 | GET | /api/barcos | Listar todos os barcos |
| US007 | POST | /api/barcos | Registar barco |
| EXTRA | GET | /api/barcos/:id | Obter barco por ID |
| US009 | GET | /api/barcos/disponibilidade/:data | Listar barcos disponíveis numa data |
| EXTRA | PATCH | /api/barcos/:id | Atualizar nome ou cor |
| EXTRA | DELETE | /api/barcos/:id | Eliminar barco |
### Reservas
| US | Método | Endpoint | Descrição |
|---|---|---|---| 
| US011 | GET | /api/reservas/marinheiro/:id | Listar reservas de um marinheiro |
| US012 | DELETE | /api/reservas/:idmarinheiro/:idbarco/:data | Cancelar reserva futura |
| US010 | POST | /api/reservas | Criar reserva |
| EXTRA | GET | /api/reservas | Listar todas as reservas |
| EXTRA | GET | /api/reservas/barco/:id | Listar reservas de um barco |

## Notas
- Ao criar uma reserva, o sistema verifica automaticamente se o marinheiro e o barco existem e se ambos estão disponíveis na data pretendida.
- Não é possível eliminar um marinheiro ou barco que tenha reservas associadas.
- Apenas é possível cancelar reservas com data futura.
- As credenciais de acesso à base de dados estão definidas em `database/barcos-marinheiros-db.js`. Em produção, devem ser guardadas em variáveis de ambiente (.env).