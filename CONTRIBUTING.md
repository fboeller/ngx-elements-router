# Contributing

## Start micro frontend with dev platform

- `npm start example-micro-frontend`

## Checks

- All: `npm run check`
- Tests: `npm run test`
- Lint: `npm run lint`
- Prettier: `npm run prettier-check`

## Publish

- Adjust version in [package.json](./projects/ngx-elements-router/package.json)
- `npm run package`
- (You need to have npm access to do that): `npm publish ./dist/ngx-elements-router/ngx-elements-router-x.x.x.tgz`
