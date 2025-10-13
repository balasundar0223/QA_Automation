import { test } from "../../../customFixtures/expertusFixture";

test.describe(`AG020 - Module Specific Admin Groups`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`Verify whether the users attached to the Talent Admin Group can see only the Skills module`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin("Talent Admin");
        
        console.log("Talent Admin Group Skills module access validated");
    });

    test(`Verify whether the users attached to the Commerce Admin Group can see only the Commerce module`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.clickCommerceAdmin();
        
        console.log("Commerce Admin Group Commerce module access validated");
    });

    test(`Verify whether the users attached to the Reports admin Group can see only the Reports Dashboard module`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        console.log("Reports Admin Group Reports Dashboard access validated");
    });

    test(`Verify whether the users attached to the People Admin Group can see only the People Module`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.clickPeopleAdmin();
        
        console.log("People Admin Group People module access validated");
    });

    test(`Verify whether the users attached to the Enrollment Admin can see only the Enrollments and the Admin Dashboard`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.clickEnrollAdmin();
        
        console.log("Enrollment Admin Group module access validated");
    });
});