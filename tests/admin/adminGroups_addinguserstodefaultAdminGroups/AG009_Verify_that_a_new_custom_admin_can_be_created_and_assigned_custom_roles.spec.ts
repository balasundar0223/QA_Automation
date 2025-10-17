import { test } from "../../../customFixtures/expertusFixture";
import { ExcelReader } from "../../../utils/excelUtils";
import { FakerData } from "../../../utils/fakerUtils";
import { AdminGroupManager } from "../../../utils/adminGroupManager";
import { AdminRoleManager } from "../../../utils/adminRoleManager";


let groupTitle = FakerData.getFirstName() + " Admin Group"
const roleName = FakerData.getFirstName() + " Admin"

const reader = new ExcelReader('./data/expertousOneData.xlsx');
const testCaseID = "TC004";
const rowData = reader.getRowByTestcase('adminGroups_CustomerAdmin', testCaseID);

test.describe(`Admin Group and Custom Role Management`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Verify the Custom role creation with all privileges `, async ({ adminHome, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Create the Custom Role` },
            { type: `Test Description`, description: `Create the Custom Role` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.clickAdminRole()
        await adminRoleHome.clickAddAdminRole()
        await adminRoleHome.enterName(roleName);
        await adminRoleHome.clickAllPriveileges();
        await adminRoleHome.clickSave()
        await adminRoleHome.verifyRole(roleName)
        
        // Store the created role for AG011 usage - this role has ALL PRIVILEGES enabled
        await AdminRoleManager.storeCreatedRole(
            roleName, 
            "Custom admin role created in AG009 with ALL PRIVILEGES enabled",
            "all_privileges"
        );
    })

    test(`Verify whether we can able to create a Admin Group`, async ({ adminHome, adminGroup, createCourse, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Add Custom role to Custom Admin group` },
            { type: `Test Description`, description: `Add Custom role to Custom Admin group` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        await adminGroup.clickCreateGroup();
        await adminGroup.selectroleAdmin(roleName);
        await adminGroup.enterGroupTitle(groupTitle);
        await adminGroup.clickActivate();
        await adminGroup.clickSave();
        await adminGroup.clickProceed();
        await createCourse.verifySuccessMessage();
        
    });

    test(`Verify whether we can edit a admin group`, async ({ adminHome, adminGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Kathir A` },
            { type: `TestCase`, description: `Edit Admin Group Name` },
            { type: `Test Description`, description: `Verify admin group name can be edited and updated` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        await adminGroup.searchAdmin(groupTitle);
        await adminGroup.clickGroup(groupTitle);
        groupTitle = groupTitle + " -E";
        await adminGroup.enterGroupTitle(groupTitle);
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        const validTillDate = futureDate.toISOString().split('T')[0];
        await adminGroup.enterValidTillDate(validTillDate);
        await adminGroup.clickUpdate();

        await AdminGroupManager.storeCreatedGroup(
            groupTitle, 
            roleName, 
            "Custom admin group created in AG009 with all privileges for comprehensive testing",
            "all_privileges"
        );


    });

    test(`Verify whether it allows to suspend the Admin Group created by Customer`, async ({ adminHome, adminGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Kathir A` },
            { type: `TestCase`, description: `Suspend Admin Group by clicking Edit` },
            { type: `Test Description`, description: `Verify admin group can be suspended through edit functionality` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        await adminGroup.searchAdmin(groupTitle);
        await adminGroup.clickGroup(groupTitle);
        await adminGroup.clickSuspend();
        await adminGroup.clickYes();
    });

    

    test(`Verify whether the Access button is in disabled state for Suspended Admin Group`, async ({ adminHome, adminGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Kathir A` },
            { type: `TestCase`, description: `Verify Access Button Disabled for Suspended Admin Group` },
            { type: `Test Description`, description: `Verify that Access button is disabled when admin group is in suspended state` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        await adminGroup.searchAdmin(groupTitle);
        await adminGroup.clickGroup(groupTitle);
        await adminGroup.verifyAccessButtonDisabled();
    });

    test(`Verify whether we can activate a admin group `, async ({ adminHome, adminGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Kathir A` },
            { type: `TestCase`, description: `Activate Admin Group` },
            { type: `Test Description`, description: `Verify suspended admin group can be activated` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        await adminGroup.searchAdmin(groupTitle);
        await adminGroup.clickGroup(groupTitle);
        await adminGroup.clickActivateGroup();
        await adminGroup.verifyActivated();
    });

})
