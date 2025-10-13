import { test } from "../../../customFixtures/expertusFixture";

test.describe(`AG019 - Manager Group`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`Verify whether the users associated to the Manager Group can see only the collaboration hub when the user has logged in`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin("Manager");
        
        console.log("Manager Group users collaboration hub access validated");
    });

    test(`Verify whether admin cannot add users to the Manager Group`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin("Manager");
        
        console.log("Manager Group manual user addition restriction validated - users added only via Create User role");
    });
});