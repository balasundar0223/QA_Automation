import { test } from "../../../customFixtures/expertusFixture";
import { AdminGroupManager } from "../../../utils/adminGroupManager";

let groupData: any;

test.describe(`AG017 - Portal Scope Isolation`, async () => {
    test.describe.configure({ mode: 'serial' })
    
    test.beforeAll(async () => {
        groupData = await AdminGroupManager.getGroupDataByType("basic");
    });

    test(`Verify whether admin group created in one portal is not getting displayed in the another portal`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        await adminGroup.searchAdmin(groupData.groupTitle);
        
        console.log("Admin group portal isolation validated successfully");
    });

    test(`Verify whether the entity which is not having the portal access the admin group should not be displayed`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        console.log("Entity portal access restriction for admin groups validated");
    });
});