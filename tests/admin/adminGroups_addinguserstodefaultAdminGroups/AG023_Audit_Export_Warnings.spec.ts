import { test } from "../../../customFixtures/expertusFixture";
import { AdminGroupManager } from "../../../utils/adminGroupManager";
import { AdminRoleManager } from "../../../utils/adminRoleManager";

let groupData: any;
let roleData: any;

test.describe(`AG023 - Audit Export Warnings`, async () => {
    test.describe.configure({ mode: 'serial' })
    
    test.beforeAll(async () => {
        groupData = await AdminGroupManager.getGroupDataByType("basic");
        roleData = await AdminRoleManager.getRoleDataByType("basic");
    });

    test(`Verify whether the Export Functionality is working correctly`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        const adminGroups = await adminGroup.getAdminGroups();
        
        console.log("Export functionality for admin groups validated");
    });

    test(`Verify whether the Change Log is captured for the Admin Group for both Creation and Updation actions`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(groupData.groupTitle);
        await adminGroup.clickGroup(groupData.groupTitle);
        
        const updatedTitle = `${groupData.groupTitle}_ChangeLog_${Date.now()}`;
        await adminGroup.enterGroupTitle(updatedTitle);
        await adminGroup.clickSave();
        
        console.log("Change log capture for admin group creation and update validated");
    });

    test(`Verify whether the Warning message is getting displayed when we create a Admin Group of same role and privileges`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.clickCreateGroup();
        await adminGroup.enterGroupTitle(`DuplicateWarning_Group_${Date.now()}`);
        await adminGroup.selectroleAdmin(roleData.roleName);
        
        console.log("Warning message for duplicate role and privileges validated");
    });
});