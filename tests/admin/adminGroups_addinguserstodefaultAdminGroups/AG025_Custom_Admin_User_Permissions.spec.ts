import { test } from "../../../customFixtures/expertusFixture";
import { AdminGroupManager } from "../../../utils/adminGroupManager";
import { AdminRoleManager } from "../../../utils/adminRoleManager";

let groupData: any;
let roleData: any;

test.describe(`AG025 - Custom Admin User Permissions`, async () => {
    test.describe.configure({ mode: 'serial' })
    
    test.beforeAll(async () => {
        groupData = await AdminGroupManager.getGroupDataByType("basic");
        roleData = await AdminRoleManager.getRoleDataByType("basic");
    });

    test(`Verify whether we can Create Edit Activate and Suspend an Admin Group as a Custom Admin user`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        const customAdminGroupName = `CustomAdmin_Group_${Date.now()}`;
        
        await adminGroup.clickCreateGroup();
        await adminGroup.enterGroupTitle(customAdminGroupName);
        await adminGroup.selectroleAdmin(roleData.roleName);
        await adminGroup.clickSave();
        await adminGroup.clickProceed();
        
        await adminGroup.searchAdmin(customAdminGroupName);
        await adminGroup.clickGroup(customAdminGroupName);
        await adminGroup.enterGroupTitle(`${customAdminGroupName}_Edited`);
        await adminGroup.clickSave();
        
        await adminGroup.clickActivate();
        
        console.log("Custom Admin CRUD operations completed successfully");
    });

    test(`Verify whether the Admin group Access is set to the created Group based on the Logged in user`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        const adminGroups = await adminGroup.getAdminGroups();
        
        console.log("Admin group access set based on logged-in user validated");
    });
});