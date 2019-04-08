# Flight Watchdog Client

[![Build Status](https://travis-ci.org/Travelport-Czech/flight-watchdog-client.svg?branch=master)](https://travis-ci.org/Travelport-Czech/flight-watchdog-client)
[![Cypress dashboard](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)](https://dashboard.cypress.io/#/projects/138158/runs)

The *Flight Watchdog Client* is frontend part built on the [Flight Watchdog API](https://cee-systems.gitbook.io/flight-watchdog-api/)  and designated for the online booking tool [GOL IBE](https://www.cee-systems.com/gol-ibe). 

The Flight Watchdog is a tool for daily flight price tracking. The flight tracking is defined by origin and destination, and a price limit. It sends you a notification, if it finds a lower price than defined.

## Requirements

* Node (>8.10)
* [Yarn](https://yarnpkg.com)

## Prepare development environment

Clone project
```bash
> git clone git@github.com:Travelport-Czech/flight-watchdog-client.git
```
Install dependencies
```bash
> yarn install
```
Run tests
```bash
> npm run test
```

## Create Own Watchdog Client 

You can create the own modification of the Client. If you choose, follow next procedure.

### Prepare
1. Fork this repository
1. Prepare the development environment of your fork
1. Check consistency of the project
    * Run tests: `npm run test`
1. Create the initial commit
    * Rename the package in package.json (`name` attribute)
    * Commit and push this change 
### Modification procedure
1. Edit the source code
1. Debug changes with
    * `npm run open` to view window in all steps
    * `npm run test-open` to run tests separately
1. Run tests: `npm run test`
1. (optional) Add or modify tests to folder `cypress/integration`
1. Run `npm run autofix`
1. Commit and push this changes

### Release
1. Change the version number in in package.json (`version` attribute)
1. Create a new tag (version number) on repository (on GitHub create a release)
1. Notify CEE Travelport with the version number to release

## Translations

* Generate the excel table to the file `translations.xlsx`:
```
> npm run lang-export
``` 
* Do modifications in the file `translations.xlsx`
* Apply modifications with:
```
> npm run lang-import
```
* Commit and push changes to the git
