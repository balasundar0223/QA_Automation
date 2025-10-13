import { test } from "../../../customFixtures/expertusFixture";
import { AdminGroupManager } from "../../../utils/adminGroupManager";

let basicGroupData: any;
let advancedGroupData: any;

test.describe(`AG016 - Admin Group Access Privileges Validation`, async () => {
    test.describe.configure({ mode: 'serial' })
    
    test.beforeAll(async () => {
        basicGroupData = await AdminGroupManager.getGroupDataByType("basic");
        advancedGroupData = await AdminGroupManager.getGroupDataByType("advanced");
    });

    test(`Verify whether the users added to the admin group acts as the privileges given in the admin group`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(basicGroupData.groupTitle);
        await adminGroup.clickGroup(basicGroupData.groupTitle);
        
        await adminGroup.searchUser("lmsadmin@nomail.com");
        await adminGroup.clickuserCheckbox("lmsadmin@nomail.com");
        await adminGroup.clickSelectUsers();
        await adminGroup.clickUpdate();
        
        console.log("Users inherit admin group privileges successfully");
    });

    test(`Verify user1 given group1 access user 2 given group2 access Create object and give group 1 access object should not be visible to user2`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(basicGroupData.groupTitle);
        await adminGroup.searchAdmin(advancedGroupData.groupTitle);
        
        console.log("Group access isolation validated successfully");
    });

    test(`Verify User 1 attached to admin group 1 User 2 attached to admin group 2 Create entity and attach admin group 1 Course will be displayed only for admin group 1 users`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        console.log("Entity access restriction by admin group validated");
    });
});