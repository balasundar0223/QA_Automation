import { test } from "../../../customFixtures/expertusFixture";
import { AdminRoleManager } from "../../../utils/adminRoleManager";

test.describe(`AG011 - System Default Admin Group Restrictions & Policy Validation`, async () => {
    test.describe.configure({ mode: 'serial' })

    let systemDefaultRole: any;

    test.beforeAll(async () => {
        // Load system_default role data from predefined JSON
        systemDefaultRole = await AdminRoleManager.getRoleDataByType("system_default");
        console.log(`Using system default role: ${systemDefaultRole.roleName}`);
    });

    test(`Verify whether it does not allow to suspend a default admin Group`, async ({ adminHome, adminGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Kathir A` },
            { type: `TestCase`, description: `Verify Default Admin Group Suspend Restriction` },
            { type: `Test Description`, description: `Verify that default admin groups cannot be suspended - suspend button should be disabled` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        // Use system_default role name from JSON data
        await adminGroup.searchAdmin(systemDefaultRole.roleName);
        await adminGroup.clickGroup(systemDefaultRole.roleName);
        await adminGroup.verifySuspendButtonDisabled();
        console.log(`Default admin group suspension restriction validated for: ${systemDefaultRole.roleName}`);
    });

    test(`Verify whether we cannot delete the Default Admin Groups`, async ({ adminHome, adminGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Kathir A` },
            { type: `TestCase`, description: `Verify Default Admin Group Delete Restriction` },
            { type: `Test Description`, description: `Verify that default admin groups cannot be deleted - delete button should be disabled` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        // Use system_default role name from JSON data
        await adminGroup.searchAdmin(systemDefaultRole.roleName);
        await adminGroup.clickGroup(systemDefaultRole.roleName);
        await adminGroup.verifyDeleteButtonDisabled();

        console.log(`Default admin group delete restriction validated for: ${systemDefaultRole.roleName}`);
    });


});