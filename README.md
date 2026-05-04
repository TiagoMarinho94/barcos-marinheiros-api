# barcos-marinheiros-api
Node.js Web API to book boats by sailors

## Tech stack
- Node.js
- Express
- Oracle Database (oracledb)
- Celebrate/Joi (validation)
- dotenv

## How to run
1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in your database credentials
4. Run `npm start`
5. API available at `http://localhost:8080`

## Architecture
The project follows a layered architecture:
Route → Controller → Service → Repository → Database

- **Routes** - define endpoints and validate input with Joi
- **Controllers** - handle HTTP requests and return responses
- **Services** - contain business logic
- **Repositories** - execute SQL queries against the database
- **DTOs** - transform data before returning to the client

## Testing
Functional tests organised as Postman collections, available in the `postman/` folder.

## Endpoints

### Sailors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/marinheiros` | List all sailors |
| GET | `/api/marinheiros/:id` | Get sailor by ID |
| GET | `/api/marinheiros/classificacao/:classif` | Filter by rating |
| POST | `/api/marinheiros` | Register sailor |
| PATCH | `/api/marinheiros/:id` | Update name, rating or age |
| DELETE | `/api/marinheiros/:id` | Delete sailor (only if no reservations) |

### Boats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/barcos` | List all boats |
| GET | `/api/barcos/:id` | Get boat by ID |
| GET | `/api/barcos/disponibilidade/:data` | List available boats on a date |
| POST | `/api/barcos` | Register boat |
| PATCH | `/api/barcos/:id` | Update name or colour |
| DELETE | `/api/barcos/:id` | Delete boat |

### Reservations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reservas` | List all reservations |
| GET | `/api/reservas/marinheiro/:id` | Reservations by sailor |
| GET | `/api/reservas/barco/:id` | Reservations by boat |
| POST | `/api/reservas` | Create reservation |
| DELETE | `/api/reservas/:idmarinheiro/:idbarco/:data` | Cancel future reservation |

## Notes
- When creating a reservation, the system automatically checks if both the sailor and the boat exist and are available on the requested date.
- Sailors and boats with active reservations cannot be deleted.
- Only future reservations can be cancelled.
- Database credentials are configured via `.env` (see `.env.example`).