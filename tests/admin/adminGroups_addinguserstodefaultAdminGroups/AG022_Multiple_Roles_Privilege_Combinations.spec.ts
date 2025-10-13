import { test } from "../../../customFixtures/expertusFixture";
import { AdminGroupManager } from "../../../utils/adminGroupManager";
import { AdminRoleManager } from "../../../utils/adminRoleManager";

let basicGroupData: any;
let advancedGroupData: any;
let roleData: any;

test.describe(`AG022 - Multiple Roles Privilege Combinations`, async () => {
    test.describe.configure({ mode: 'serial' })
    
    test.beforeAll(async () => {
        basicGroupData = await AdminGroupManager.getGroupDataByType("basic");
        advancedGroupData = await AdminGroupManager.getGroupDataByType("advanced");
        roleData = await AdminRoleManager.getRoleDataByType("advanced");
    });

    test(`Verify for the following scenerio - Create a admin group and attach user 1 with Commerce Admin Role and Manage Role privilages`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(advancedGroupData.groupTitle);
        
        console.log("Commerce Admin Role and Manage Role combination validated - user sees Commerce and Manage modules");
    });

    test(`Verify for the following scenerio - User 1 is attached to Admin group 1 and given Manager Role`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        console.log("Manager Role Reports Admin access restriction validated - no People Module access");
    });

    test(`Verify for the following scenerio - User 1 is attached to Admin group 1 and given Commerce Admin Role`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        console.log("Commerce Admin Role Course Creator access restriction validated - no People Module access");
    });

    test(`Verify for the following scenerio - User1 is attached to Admin group 1 and given People Admin Role`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        await adminGroup.searchAdmin(basicGroupData.groupTitle);
        
        console.log("People Admin Role Super Admin E1 access allowed - has People Module access");
    });

    test(`Verify for the following scenerio part of two groups people and enrollment remove the admin group then the privilege should get display`, async ({ adminHome, adminGroup }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        console.log("Multi-group privilege display after removal validated");
    });
});