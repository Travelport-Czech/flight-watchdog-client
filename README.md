# Flight Watchdog Client

[![Build Status](https://travis-ci.org/Travelport-Czech/flight-watchdog-client.svg?branch=master)](https://travis-ci.org/Travelport-Czech/flight-watchdog-client)

## Needed applications

* Node (>8.10)
* Yarn (https://yarnpkg.com)

## Prepare development environment

1. Clone project
1. Install dependencies
```
> yarn install
```

## Create Own Watchdog Client 
### Prepare
1. Fork this repository
1. Prepare development environment of your fork
1. Check consistency of the project
    * Run tests: `npm run test`
1. Create initial commit
    * Rename package in package.json (`name` attribute)
    * Commit and push this change 
### Modification procedure
1. Create modification on source code
1. Debug changes with
    * `npm run open` to view window in all steps
    * `npm run test-open` to run tests separately
1. Run tests: `npm run test`
1. (optional) Add or modify tests to folder `cypress/integration`
1. Run `npm run autofix`
1. Commit and push this changes

### Release
1. Change version in in package.json (`version` attribute)
1. Create tag (version number) on repository (on GitHub create a release)
1. Notify CEE Travelport with the version number to release
