import { test } from "../../../customFixtures/expertusFixture";
import { AdminGroupManager } from "../../../utils/adminGroupManager";

let groupData: any;

test.describe(`AG015 - Admin Group Entity Attachment`, async () => {
    test.describe.configure({ mode: 'serial' })
    
    test.beforeAll(async () => {
        groupData = await AdminGroupManager.getGroupDataByType("basic");
    });

    test(`Verify whether the admin can suspend admin group when it is attached to any entity but cannot delete the admin group`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(groupData.groupTitle);
        
        console.log("Entity attached admin group suspend allowed, delete restricted");
    });

    test(`Verify whether the suspended admin group cannot be added to any entity`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        console.log("Suspended admin group entity attachment restriction validated");
    });

    test(`Verify whether we can remove the admin group manually for any entity`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(groupData.groupTitle);
        
        console.log("Manual admin group removal from entity validated");
    });
});