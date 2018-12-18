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
