/* eslint-disable import/no-anonymous-default-export */

const esModules = [
    '@angular',
    '@ngrx',
    '@ngrx-translate',
    'rxjs',
];

export default {
    /* All imported modules in your tests should be mocked automatically
     automock: false, */

    // Stop running tests after `n` failures, if true -> 1 fail
    bail: false,

    // The directory where Jest should store its cached dependency information
    cacheDirectory: './tmp/jest_rs',

    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    /* An array of glob patterns indicating a set of files for which coverage information should be collected
     collectCoverageFrom: undefined, */

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ['/node_modules/', '/src/app/api'],

    /* Indicates which provider should be used to instrument code for coverage
     coverageProvider: "babel", */

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['json', 'text', 'lcov', 'clover'],

    /* An object that configures minimum threshold enforcement for coverage results
     coverageThreshold: undefined, */

    /* A path to a custom dependency extractor
     dependencyExtractor: undefined, */

    /* Make calling deprecated APIs throw helpful error messages
     errorOnDeprecated: false, */

    extensionsToTreatAsEsm: ['.ts'],

    /* The default configuration for fake timers
     fakeTimers: {
       "enableGlobally": false
     }, */

    /* Force coverage collection from ignored files using an array of glob patterns
     forceCoverageMatch: [], */

    /* A path to a module which exports an async function that is triggered once before all test suites */
    globalSetup: 'jest-preset-angular/global-setup',

    /* A path to a module which exports an async function that is triggered once after all test suites
     globalTeardown: undefined, */

    /* A set of global variables that need to be available in all test environments */
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.html|svg$',
        },
    },

    /*  The maximum amount of workers used to run your tests. Can be specified as % or a number.
        E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number.
        maxWorkers: 2 will use a maximum of 2 workers. */
    // maxWorkers: '50%',

    /* An array of directory names to be searched recursively up from the requiring module's location */
    moduleDirectories: ['node_modules', 'src/app'],

    // An array of file extensions your modules use
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],

    /* A map from regular expressions to module names or to arrays of module names
    that allow to stub out resources with a single module */
    moduleNameMapper: {
        '@app/(.*)': ['<rootDir>/src/app/$1'],
        '@app-data/(.*)': ['<rootDir>/src/app/modules/_data/$1'],
        '@app-shared-core/(.*)': ['<rootDir>/src/app/modules/_shared/core/$1'],
        '@app-shared-onfido/(.*)': ['<rootDir>/src/app/modules/_shared/onfido/$1'],
        '@app-admin/(.*)': ['<rootDir>/src/app/modules/admin/$1'],
        '@app-core/(.*)': ['<rootDir>/src/app/modules/core/$1'],
        '@app-faq/(.*)': ['<rootDir>/src/app/modules/faq/$1'],
        '@app-feature-test/(.*)': ['<rootDir>/src/app/modules/feature-test/$1'],
        '@app-funding/(.*)': ['<rootDir>/src/app/modules/funding/$1'],
        '@app-home/(.*)': ['<rootDir>/src/app/modules/home/$1'],
        '@app-instruments/(.*)': ['<rootDir>/src/app/modules/instruments/$1'],
        '@app-investor/(.*)': ['<rootDir>/src/app/modules/investor/$1'],
        '@app-marketplace/(.*)': ['<rootDir>/src/app/modules/marketplace/$1'],
        '@app-my-profile/(.*)': ['<rootDir>/src/app/modules/my-profile/$1'],
        '@app-onboarding/(.*)': ['<rootDir>/src/app/modules/onboarding/$1'],
        '@app-onboarding-entities/(.*)': ['<rootDir>/src/app/modules/onboarding-entities/$1'],
        '@app-pricing/(.*)': ['<rootDir>/src/app/modules/pricing/$1'],
        '@app-primary-trade/(.*)': ['<rootDir>/src/app/modules/primary-trade/$1'],
        '@app-reporting/(.*)': ['<rootDir>/src/app/modules/reporting/$1'],
        '@app-secondary-trade/(.*)': ['<rootDir>/src/app/modules/secondary-trade/$1'],
        '@app-tests/(.*)': ['<rootDir>/src/app/modules/tests/$1'],
        '@root/(.*)': ['<rootDir>/$1'],
        '^!!raw-loader!src/assets/(.*)$': '<rootDir>/src/assets/$1',
        'src/assets/(.*)$': '<rootDir>/src/assets/$1',
    },

    /* An array of regexp pattern strings, matched against all module paths
    before considered 'visible' to the module loader
     modulePathIgnorePatterns: [], */

    /* Activates notifications for test results
     notify: false, */

    /* An enum that specifies notification mode. Requires { notify: true }
     notifyMode: "failure-change", */

    // A preset that is used as a base for Jest's configuration
    preset: 'jest-preset-angular',

    /* Run tests from one or more projects
     projects: undefined, */

    /* Use this configuration option to add custom reporters to Jest
     reporters: undefined, */

    /* Automatically reset mock state before every test
     resetMocks: false, */

    /* Reset the module registry before running each individual test
     resetModules: false, */

    /* A path to a custom resolver
     resolver: undefined, */
    resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',

    /* Automatically restore mock state and implementation before every test
     restoreMocks: false, */

    /* The root directory that Jest should scan for tests and modules within
     rootDir: undefined, */

    /* A list of paths to directories that Jest should use to search for files in
     roots: [
       "<rootDir>"
     ], */

    /* Allows you to use a custom runner instead of Jest's default test runner
     runner: "jest-runner", */

    /* The paths to modules that run some code to configure or set up the testing environment before each test
     setupFiles: [], */

    /* A list of paths to modules that run some code to configure
       or set up the testing framework before each test */
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],

    // The number of seconds after which a test is considered as slow and reported as such in the results.
    slowTestThreshold: 1,

    /* A list of paths to snapshot serializer modules Jest should use for snapshot testing */
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    /* Options that will be passed to the testEnvironment
     testEnvironmentOptions: {}, */

    /* Adds a location field to test results
     testLocationInResults: false, */

    // The glob patterns Jest uses to detect test files
    // testMatch: [
    //   "**/__tests__/**/*.[jt]s?(x)",
    //   "**/?(*.)+(spec|test).[tj]s?(x)"
    // ],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/playwright/',
        '<rootDir>/src/assets/',
    ],

    /* The regexp pattern or array of patterns that Jest uses to detect test files
     testRegex: [], */

    /* This option allows the use of a custom results processor
     testResultsProcessor: undefined, */

    /* This option allows use of a custom test runner
     testRunner: "jest-circus/runner", */

    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
    },

    /* An array of regexp pattern strings that are matched against all source file paths,
     matched files will skip transformation*/
    // transformIgnorePatterns: ['<rootDir>/node_modules/(?!@ngrx|ng2-translate|lodash)'],

    transformIgnorePatterns: [`<rootDir>/node_modules/(?!.*\\.mjs$|${esModules.join('|')})`],

    /* An array of regexp pattern strings that are matched against all modules
    before the module loader will automatically return a mock for them
     unmockedModulePathPatterns: undefined, */

    /* Indicates whether each individual test should be reported during the run
     verbose: undefined, */

    /* An array of regexp patterns that are matched against all source file paths
    before re-running tests in watch mode
     watchPathIgnorePatterns: [], */

    /* Whether to use watchman for file crawling
     watchman: true, */
};
