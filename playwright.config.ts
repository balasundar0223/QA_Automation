import { defineConfig, devices } from '@playwright/test';


let jiraIssueKeys: string[] = [];
const timestamp = Date.now();
const reportDir = `./reporter/playwright-reports-${timestamp}`;

//If false qa will run,if its true automation environment will run
<<<<<<< HEAD
export let environmentSetup: "qa" | "dev" | "automation" | "qaProduction"= 'qaProduction';
export default defineConfig({
  timeout: 800000,

  expect: {
    timeout: 100000
  },
=======
export let environmentSetup: "qa" | "dev" | "automation" | "qaProduction" = 'qaProduction';
export default defineConfig({
 timeout: 700000,  
  expect: { timeout: 10000 }, // 10 sec for assertions
  
 
>>>>>>> origin/master
  testDir: './tests',
  // globalSetup: require.resolve('utils/jiraReport.ts'),

  fullyParallel: false,
  retries: 0,
<<<<<<< HEAD
  workers: 1,
=======
  workers: 2,
>>>>>>> origin/master
  repeatEach: 0,

  reporter: [['html', { outputFolder: reportDir, open: 'always' }], ['line'], ["allure-playwright"]],
  //reporter: [['html', { open: 'always' }]],
  use: {
<<<<<<< HEAD
    actionTimeout: 100000,
=======
    actionTimeout: 100000, // or set to 30000 if you prefer the original value
>>>>>>> origin/master
    trace: 'on',
    headless: false,
    screenshot: "on",
    video: 'on',
    ignoreHTTPSErrors: true,
    bypassCSP: true,
<<<<<<< HEAD

=======
>>>>>>> origin/master
  },

  // testMatch: [
  //   '*/tests/admin/adminGroups_CustomerAdminGroupUserCreation/**/*.spec.ts',
  //   '*/tests/admin/adminGroups2/**/*.spec.ts',
<<<<<<< HEAD
  //   '*/tests/admin/customrolecreation/**/*.spec.ts',
  //   '*/tests/admin/metadataLibrary/**/*.spec.ts',
  //   '*/tests/admin/location/**/*.spec.ts',
  //   '*/tests/content/content/**/*.spec.ts',
=======
  //  '*/tests/admin/customrolecreation/**/*.spec.ts',
  //   // '*/tests/admin/metadataLibrary/**/*.spec.ts',
  //   '*/tests/admin/location/**/*.spec.ts',
>>>>>>> origin/master
  // '*/tests/admin/admin_Enrollments/**/*.spec.ts',
  //   '*/tests/admin/completionCertificate/**/*.spec.ts',
  //   '*/tests/admin/assessment/**/*.spec.ts',
  //   '*/tests/admin/survey/**/*.spec.ts',
<<<<<<< HEAD
  //   '*/tests/content/content/**/*.spec.ts',
  //   '*/tests/admin/peoplemodule_user/**/*.spec.ts',
  //   '*/tests/admin/quickaccess/**/*.spec.ts',
  //   '*/tests/admin/communication/**/*.spec.ts',
  //   '*/tests/admin/learnerGroup/**/*.spec.ts',
  //   '*/tests/admin/announcement/**/*.spec.ts',
=======
  //   '*/tests/admin/content/**/*.spec.ts',
  //     '*/tests/admin/organization/**/*.spec.ts',
  //  '*/tests/admin/peoplemodule_user/**/*.spec.ts',
  //   '*/tests/admin/quickaccess/**/*.spec.ts',
  //   '*/tests/admin/communication/**/*.spec.ts',
  //   '*/tests/admin/learnerGroup/**/*.spec.ts',
  // '*/tests/admin/announcement/**/*.spec.ts',
>>>>>>> origin/master
  // '*/tests/admin/course/**/*.spec.ts',
  // '*/tests/admin/trainingPlan/**/*.spec.ts',
  //   '*/tests/admin/managerApproval/**/*.spec.ts',
  //     '*/tests/Collaboration-Hub/**/*.spec.ts',
  //     '*/tests/LearnerSide/**/*.spec.ts',
  //     '*/tests/Instructor/**/*.spec.ts',
  //     '*/tests/LearnerProfile/**/*.spec.ts',
<<<<<<< HEAD
  //     '*/tests/organization/**/*.spec.ts',
  //     '*/tests/ReEnroll/**/*.spec.ts',
  //     '*/tests/EnrollmentByManager/**/*.spec.ts',
  //     '*/tests/Terms_and_Conditions/**/*.spec.ts',
  //     '*/tests/SSO/**/*.spec.ts',
     // '*/api/apiTestIntegration/**/*.spec.ts',


  //  ]
=======
  //    '*/tests/ReEnroll/**/*.spec.ts',
  //     '*/tests/EnrollmentByManager/**/*.spec.ts',
  //   // '*/tests/Terms_and_Conditions/**/*.spec.ts',  
  //   // '*/tests/SSO/**/*.spec.ts',
  //   '*/api/apiTestIntegration/**/*.spec.ts',

  // ],
>>>>>>> origin/master

  projects: [
    /* {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chromium'],
        ignoreHTTPSErrors: true,
        headless: false,
        video: 'on',
        screenshot: "on",
        viewport: null,
        launchOptions: {
          slowMo: 300,
          args: ["--start-maximized"]
        },


      }

    }, */
    {
      name: 'chrome',
      use: {
        browserName: 'chromium', ...devices['Desktop Chromium'], channel: 'chrome', headless: false,
        viewport: null,
        launchOptions: {
<<<<<<< HEAD
          slowMo: 400,
=======
          slowMo: 300,
>>>>>>> origin/master
          args: ["--start-maximized", "--disable-web-security", "--incognito"]
        }
      }
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     ...devices['Desktop Firefox'],
    //     channel: 'firefox',
    //     headless: false,

    //     launchOptions: {
    //       slowMo: 400, 
    //       args: [
    //         '--start-maximized',
    //         '--private',
    //         '--disable-web-security',
    //       ],
    //     },
    //     viewport: { width: 1530, height: 740 },
    //   },
    // },
    ...(
      true ? [{
        name: 'Verification',
        testDir: './zCronVerification',
        use: {

          headless: false,
          ...devices['Desktop Chromium'],
          viewport: null,
          launchOptions: {
            slowMo: 300,
            args: ["--start-maximized"]
          }
        }
      },] : []
    ), ...(
      true ? [{
        name: 'API Testing',
        testDir: './api',

        use: {
          headless: false,
          ...devices['Desktop Chromium'],
          viewport: null,
          launchOptions: {
            slowMo: 300,
            args: ["--start-maximized"]
          }

        }
      },] : []
    ),
  ],



});
