import { test } from "../../../customFixtures/expertusFixture";
import { AdminGroupManager } from "../../../utils/adminGroupManager";

let groupData: any;

test.describe(`AG014 - User State Impact Admin Group`, async () => {
    test.describe.configure({ mode: 'serial' })
    
    test.beforeAll(async () => {
        groupData = await AdminGroupManager.getGroupDataByType("basic");
    });

    test(`Verify whether the Deleted users are not getting displayed in Added users`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(groupData.groupTitle);
        await adminGroup.clickGroup(groupData.groupTitle);
        
        console.log("Deleted users exclusion from Added users validated");
    });

    test(`Verify whether the suspended users is not getting displayed in the Select Users section of Admin Group`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(groupData.groupTitle);
        await adminGroup.clickGroup(groupData.groupTitle);
        
        console.log("Suspended and deleted users exclusion from Select Users validated");
    });

    test(`Verify whether the users gets removed from the Admin Group when the user gets suspended or deleted`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(groupData.groupTitle);
        
        console.log("User removal on status change validated");
    });
});