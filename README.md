# Demo App in NodeJS


## Prerequisites
- docker
- docker-compose
- mysql client

<br>

## Package Structure
| S/N | Name | Type | Description |
|-----|------|------|-------------|
| 1 | Server | dir | This holds the code for building NodeJS Server App.
| 3 | README.md | file | This file |


<br>

## Exposed Port
| S/N | Application | Exposed Port |
|-----|-------------|--------------|
| 1 | database | 3306 |
| 2 | server | 8080 |


<br>


### Starting Server App
Starting the project in local environment.
This will 
 1) Brings up mysql db and server
 2) Initialize dumps from the database directory

```bash
docker-compose up -d
```
We can check the status of services using the follwing commands:
For server
```bash
docker-compose logs -f server 
```
For db
```bash
docker-compose logs -f db
```

<br>

<br>

### Accessing backend API docs
For viewing and executing the available APIs.

http://localhost:8080

Swagger API documentation- 
http://localhost:8080/api-docs

<br>
DB can be accessed by the following commands
mysql -h 127.0.0.1 -u root -P 3306 -p demodb
Upon password prompt enter 'password' as the password

<br>
<br>

<br>
App configuration can be modified using .env file  at  the root folder. 

