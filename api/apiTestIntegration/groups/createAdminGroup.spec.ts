import { generateOauthToken } from "../../accessToken";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from '../../../utils/fakerUtils';
import { createAdminGroup, generateCode } from "../../../data/apiData/formData";
import { createAdminGroup_fn } from "../../groups";
import { credentials } from "../../../constants/credentialData";

let access_token: any;
let code: any;
let title: any;
let code1: any;
let title1: any;
let status = "active";
let admin_roles:any=[];

<<<<<<< HEAD
let included_users=credentials.LEARNERUSERNAME.username;
=======
let included_users= FakerData.getUserId()
>>>>>>> origin/master
//let valid_till: any= getFutureDate()
let valid_till: any= "10/05/2035"   //MM/DD/YYYY format


title = "AG"+' '+ FakerData.getCategory();
code = "AG"+' '+generateCode();
title1= "AG"+' '+FakerData.getCategory();
code1= "AG"+' '+generateCode();
const roleName = FakerData.getFirstName() + " Admin"
const roleName1 = FakerData.getFirstName() + " Admin"

 //admin_roles=roleName,roleName1;


test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});


test.describe(`Verify the privileges and search functionality`, async () => {
    test.describe.configure({ mode: 'serial' })
<<<<<<< HEAD
=======
    test(`Creating an user for AdminGroup API`, async ({ adminHome, editCourse, createUser, learnerHome, adminRoleHome, adminGroup, createCourse, contentHome, learnerGroup }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Creating an user for AdminGroup API` },
        { type: `Test Description`, description: `Creating user for AdminGroup API` }

    );
         await adminHome.loadAndLogin("SUPERADMIN")
            await adminHome.menuButton()
            await adminHome.people();
            await adminHome.user();
            await createUser.clickCreateUser();
            await createUser.verifyCreateUserLabel();
            await createUser.enter("first_name", FakerData.getFirstName());
            await createUser.enter("last_name", FakerData.getLastName());
            await createUser.enter("username", included_users);
            await createUser.enter("user-password", "Welcome1@");
            await createUser.clickSave();
          //  await createUser.verifyUserCreationSuccessMessage();
           // await contentHome.gotoListing();
    });

>>>>>>> origin/master
    test(`Verify the Custom role creation with all privileges `, async ({ adminHome, adminGroup, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `Testcase`, description: `Verify the Custom role creation` },
            { type: `Test Description`, description: `Verify the Custom role creation` }
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
    })
test(`2_Verify the Custom role creation with all privileges `, async ({ adminHome, adminGroup, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `Testcase`, description: `Verify the Custom role creation` },
            { type: `Test Description`, description: `Verify the Custom role creation` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.clickAdminRole()
        await adminRoleHome.clickAddAdminRole()
        await adminRoleHome.enterName(roleName1);
        await adminRoleHome.clickAllPriveileges();
        await adminRoleHome.clickSave()
        await adminRoleHome.verifyRole(roleName1)
         await admin_roles.push(roleName,roleName1);
    })


test('Verify that a group can be created using the `createGroupAPI`', async () => {

    await createAdminGroup_fn(createAdminGroup(title,code,admin_roles,status,), { Authorization: access_token });   
});

test('Verify that a group can be created with users and validity using the `createGroupAPI`', async () => {

    await createAdminGroup_fn(createAdminGroup(title1,code1,admin_roles,status,included_users,valid_till), { Authorization: access_token });   
    console.log("Group created successfully with included users and valid till date");
    console.log(included_users);
    console.log(valid_till);
});

})