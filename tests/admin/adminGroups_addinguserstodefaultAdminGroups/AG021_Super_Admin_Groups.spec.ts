import { test } from "../../../customFixtures/expertusFixture";

test.describe(`AG021 - Super Admin Groups`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`Verify whether the users attached to the Super Admin - Customer can see the following modules`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin("Super Admin - Customer");
        
        console.log("Super Admin Customer module access validated - Learning Survey Assessment Location Learning Settings CEU Esignature Admin Dashboard Discussion OJT Impersonation Manage Reports Commerce Skill");
    });

    test(`Verify whether the users attached to the Super Admin - E1 can see all the modules`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin("Super Admin - E1");
        
        console.log("Super Admin E1 all modules access validated");
    });
});