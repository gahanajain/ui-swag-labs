import type { Options } from '@wdio/types'
const fs = require('fs');
const path = require('path');
const AllureReporter = require('@wdio/allure-reporter').default;
import { execSync } from 'child_process';

export const config: Options.Testrunner = {
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [
        './test/specs/**/*.ts'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'jasmine',
    reporters: [
        'spec',
        'dot',
        ['video', {
            saveAllVideos: true,
            videoSlowdownMultiplier: 50,
            outputDir: path.join(__dirname, 'target', 'videos')
        }],
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    // Options to be passed to Jasmine.
    jasmineOpts: {
        // Jasmine default timeout
        defaultTimeoutInterval: 60000,
        expectationResultHandler: async function (passed, assertion) {
            if (!passed) {
                // Take a screenshot
                console.log(`Assertion failed: ${assertion.message}`);
                const screenshot = await browser.takeScreenshot();
                const timestamp = new Date().toISOString().replace(/:/g, '-');
                const filename = `AssertionError_${timestamp}.png`;
                const directory = path.join(__dirname, 'target', 'screenshots');
                const filePath = path.join(directory, filename);
                fs.mkdirSync(directory, { recursive: true });
                fs.writeFileSync(filePath, screenshot, 'base64');
                console.log(`Screenshot of the failure saved to: ${filePath}`);
            }
        },
    },
    before: function (_capabilities) {
        browser.maximizeWindow();
    },
    beforeTest: function (test, _context) {
        console.log(`onTestStart: ${test.description} `);
    },
    afterTest: async function (test, _context) {
        const videoFileName = `${test.fullName.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;
        const videoFilePath = path.join(__dirname, 'target', 'videos', videoFileName);
        console.log(`- Video of the test case saved at ${videoFilePath}`);

        if (fs.existsSync(videoFilePath)) {
            const videoData = fs.readFileSync(videoFilePath);
            AllureReporter.addAttachment('Video', videoData, 'video/mp4');
        }
    },
    onComplete: function (_exitCode, _config, _capabilities, _results) {
        console.log('Generating Allure report...');
        try {
            const reportOutputDir = 'target/allure-report';
            execSync(`allure generate allure-results --clean -o ${reportOutputDir}`, { stdio: 'inherit' });
            console.log(`Allure report successfully generated and saved in ./${reportOutputDir}`);
            console.log('Serving Allure report...');
            execSync(`serve -s ${reportOutputDir}`, { stdio: 'inherit' });
        } catch (error) {
            console.error('Error generating Allure report:', error);
        }
    },
}
