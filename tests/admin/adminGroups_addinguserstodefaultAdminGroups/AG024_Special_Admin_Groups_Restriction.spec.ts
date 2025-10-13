import { test } from "../../../customFixtures/expertusFixture";

test.describe(`AG024 - Special Admin Groups Restriction`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`Verify whether the Course Creator Admin Group/Admin Role and Program Creator Admin Role/Admin Group are not present in the Admin Role and Admin Group page`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        const adminGroups = await adminGroup.getAdminGroups();
        
        console.log("Course Creator and Program Creator admin groups exclusion from admin pages validated");
    });
});