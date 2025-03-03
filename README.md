## Overview
This README describes the setup and execution process for the automated test suite of the Sauce Demo website. 
The tests are written in TypeScript, utilizing WebdriverIO as the test automation framework, and Jasmine as the test runner. 
Various page objects have been created to abstract page details and provide reusable test functions.

## Built With

- WebdriverIO - Test automation framework
- Jasmine - Behavior-driven development framework used for testing
- Allure Reporter - Used to generate a detailed test report

## Test Scenarios

The test suite covers the following scenarios:

- User authentication with valid credentials.
- Adding a number of products to the shopping cart.
- Validation of product details in the shopping cart.
- Entering personal information for checkout.
- Verifying the correctness of the checkout subtotal.
- Completing the checkout process and logging out.

## Project Structure

The project directory structure is organized as follows:
- `test/specs`: Test specification files.
- `test/pageobjects`: Page object files contain selectors and methods for interacting with web pages.
- `test/constants`: JSON file containing constants used across the test suite.
- `wdio.conf.ts`: WebdriverIO configuration file.

## Demo Video

https://github.com/gahanajain/ui-swag-labs/assets/70436638/f8b531e7-381b-477f-8918-481c2c942ebd

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v12 or higher)
- npm

### Installing

First, clone the repository and navigate to the project directory:

```sh
git clone https://github.com/gahanajain/ui-swag-labs.git
cd ui-swag-labs
```

### Then install the dependencies:
```sh
npm install
```

### Running the tests
Export Sauce Labs credentials as environment variables:

```sh
export SAUCELABS_USERNAME="standard_user"
export SAUCELABS_PASSWORD="<Password of standard_user>"
```

## To run the tests, execute:

```sh
npx wdio run wdio.conf.ts
```

The test results will be generated in the allure-results directory, and the Allure report will be generated in target/allure-report. Open the index.html from the report directory in your browser to view it.

## Allure Report

After execution, the Allure report is automatically generated in the target/allure-report directory. 
To serve the report locally with a web server, install the http-server package globally:

```sh
npm install -g serve
```
Then, navigate to the generated report directory and start the server:

Visit http://localhost:port in your browser to view the report (port would be mentioned in the logs)

## Dependencies

The project uses the following npm packages:

- @wdio/cli
- @wdio/local-runner
- @wdio/jasmine-framework
- @wdio/allure-reporter
- typescript
- ts-node
- @types/node
- expect-webdriverio
- allure-commandline (should be installed globally or added to your project locally)


