# foncia_technical_test

## Start & Stop API

```bash
npm start
.
.
npm stop
```

## List Running services (API and Database)

```bash
npm run list
```

## View API logs

```bash
npm run logs
```

## Restore & Reset Database

```bash
npm run restore
.
.
npm run reset
```

## Run API integration tests
> Always reset and restore the database before running the integration tests

```bash
npm stop
npm run reset
npm start
npm run restore
npm test
```
## Security
> To activate the security, set the API.secured value in api/config/default.json to **true** and get a token with the following command
```bash
curl --request POST \
  --url https://vvf.eu.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"0DJQkV8UKwnqhIaCGHAmNFdYt3qHuVKf","client_secret":"32pzwNzzbvMmD02TjRDGRcVvLwwV9Wcc0t4UdKzrY43hIz91XmPtbcCj3XtREjAe","audience":"http://foncia.victornitu.com","grant_type":"client_credentials"}'
```

## List clients
```bash
curl localhost:8080/client
curl localhost:8080/client?page=2&size=10
...
```

## List lots
```bash
curl localhost:8080/lot
curl localhost:8080/lot?page=2&size=10
```

## Create new client
```bash
curl --request POST \
    --url localhost:8080/client \
    --header 'content-type: application/json' \
    --data '{"fullname":  "Victor Nitu", ... }'
```

## Create new lot
```bash
curl --request POST \
    --url localhost:8080/lot \
    --header 'content-type: application/json' \
    --data '{"surface":  40, ... }'
```
