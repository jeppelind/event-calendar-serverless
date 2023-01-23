# Events API

Azure Functions API for fetching data from a MongoDB database.

## Environment variables
Name | Description
--- | ---
DB_CONNECTION_STRING | Url to database

## Endpoints
`login` - Accepts user credentials and returns user data on succeful aunthentication.

`graphql` - GraphQL endpoint for reading and manipulating the event data.