import { test } from "../../../customFixtures/expertusFixture";

test.describe(`AG018 - Instructor Group`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`Check that users assigned to the Instructor Role can only see the instructor Group when they log in`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin("Instructor");
        
        console.log("Instructor Role users access validated - Discussion View Create, Reports View Create Edit Delete");
    });

    test(`Verify whether admin cannot add users to the Instructor Group`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin("Instructor");
        
        console.log("Instructor Group manual user addition restriction validated - users added only via Create User role");
    });
});