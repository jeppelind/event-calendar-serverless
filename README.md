# Event Calendar Serverless

This is a serverless version of the [event-calendar](https://github.com/jeppelind/event-calendar) repo that makes use of Azure services, unlike the previous project that is designed to run several Docker instances in Kubernetes.

The data is stored in a serverless Azure Cosmos DB.

The main parts:  
* `api` - The api that interacts with the database. Has one /graphQL endpoint for modifying the data, and a /login endgoint for user login via the web and app.
* `client` - React app that is hosted as a Static Web App on Azure.

More indepth README files exist in subfolders.

Live site found at https://evenemangskalendern.com