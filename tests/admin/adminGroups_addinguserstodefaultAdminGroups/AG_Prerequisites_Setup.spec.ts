import { test } from "../../../customFixtures/expertusFixture";
import { AdminRoleManager } from "../../../utils/adminRoleManager";
import { AdminGroupManager } from "../../../utils/adminGroupManager";

test.describe(`AG Prerequisites - Setup and Verify Test Data Foundation`, async () => {
    test.describe.configure({ mode: 'serial' })
    
    test(`Setup 1: Verify All Predefined Admin Roles Exist`, async ({ adminHome, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Kathir A` },
            { type: `TestCase`, description: `AG_PREREQ_001_Verify_All_Admin_Roles_Exist` },
            { type: `Test Description`, description: `Verify all 5 predefined admin roles exist in the system before running AG tests` },
            { type: `Priority`, description: `Critical - Must run before all AG tests` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        
        // Check all 5 predefined admin role types
        const roleTypes = ["basic", "advanced", "manager", "search", "filter"];
        
        for (const roleType of roleTypes) {
            const roleData = await AdminRoleManager.getRoleDataByType(roleType);
            console.log(`Checking role type: ${roleType} - ${roleData.roleName}`);
            
            // Ensure role exists (create only if not present)
            await AdminRoleManager.ensureRoleExists(adminHome, adminRoleHome, roleData);
            console.log(`✓ Role verified: ${roleData.roleName}`);
        }
        
        console.log("✅ All 5 predefined admin roles are available in the system");
    });

    test(`Setup 2: Verify All Predefined Admin Groups Exist`, async ({ adminHome, adminGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Kathir A` },
            { type: `TestCase`, description: `AG_PREREQ_002_Verify_All_Admin_Groups_Exist` },
            { type: `Test Description`, description: `Verify all 5 predefined admin groups exist with correct role mappings` },
            { type: `Priority`, description: `Critical - Must run before all AG tests` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        
        // Check all 5 predefined admin group types
        const groupTypes = ["basic", "advanced", "manager", "search", "filter"];
        
        for (const groupType of groupTypes) {
            const groupData = await AdminGroupManager.getGroupDataByType(groupType);
            console.log(`Checking group type: ${groupType} - ${groupData.groupTitle}`);
            
            // Ensure group exists with correct role mapping
            await AdminGroupManager.ensureGroupExists(adminHome, adminGroup, groupData);
            console.log(`✓ Group verified: ${groupData.groupTitle} -> Role: ${groupData.roleName}`);
        }
        
        console.log("✅ All 5 predefined admin groups are available with correct role mappings");
    });

    test(`Setup 3: Verify System Readiness for AG Test Suite`, async ({ adminHome, adminGroup, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Kathir A` },
            { type: `TestCase`, description: `AG_PREREQ_003_System_Readiness_Check` },
            { type: `Test Description`, description: `Final system readiness verification for AG test suite execution` },
            { type: `Priority`, description: `Critical - Must pass before AG tests` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        
        // Navigate to Admin Roles and verify accessibility
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.clickAdminRole();
        
        console.log("✓ Admin Roles section accessible");
        
        // Navigate to Admin Groups and verify accessibility  
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        
        console.log("✓ Admin Groups section accessible");
        
        // Verify we can search for our predefined groups
        const groupData = await AdminGroupManager.getGroupDataByType("basic");
        await adminGroup.searchAdmin(groupData.groupTitle);
        
        console.log(`✓ Search functionality working for: ${groupData.groupTitle}`);
        console.log("🎉 System is ready for AG test suite execution!");
        console.log("");
        console.log("Available Test Data:");
        console.log("  Admin Roles: QA_Basic_Admin_Role, QA_Advanced_Admin_Role, QA_Manager_Role, QA_Search_Test_Role, QA_Filter_Test_Role");
        console.log("  Admin Groups: QA_Basic_Admin_Group, QA_Advanced_Admin_Group, QA_Manager_Group, QA_Search_Test_Group, QA_Filter_Test_Group");
        console.log("");
        console.log(" Prerequisites setup completed successfully!");
    });
});