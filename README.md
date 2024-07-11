# Sauce Demo Web Automation Project

This repository contains automated tests for the Sauce Demo e-commerce web application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v12 or higher)
- npm (usually comes with Node.js)

### Installing

First, clone the repository and navigate to the project directory:

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/sauce-demo-automation.git
cd sauce-demo-automation
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

## Built With

- WebdriverIO - Test automation framework
- Jasmine - Behavior-driven development framework used for testing
- Allure Reporter - Used to generate a detailed test report

## Allure Report

After execution, the Allure report is automatically generated in the target/allure-report directory. 
To serve the report locally with a web server, install the http-server package globally:

```sh
npm install -g serve
```
Then, navigate to the generated report directory and start the server:

Visit http://localhost:port in your browser to view the report (port would be mentioned in the logs)
