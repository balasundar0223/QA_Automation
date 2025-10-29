import { expect, test } from "@playwright/test";
import { generateOauthToken } from "../../accessToken";
import { createOrganization, listOrganization } from "../../organizationAPI";
import { FakerData } from "../../../utils/fakerUtils";
import { generateCode } from "../../../data/apiData/formData";


<<<<<<< HEAD


=======
const orgName = (FakerData.OrganizationName());
const code = "ORG-" + generateCode();
>>>>>>> origin/master
let access_token: string

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe(`AP002_UpdateUser_api_testing`, async () => {
    test.describe.configure({ mode: 'serial' });

    test('Create Organization ', async () => {
<<<<<<< HEAD
        for (let index = 1; index <= 300; index++) {
        const orgName = (FakerData.OrganizationName()+(Date.now()));
        await createOrganization(orgName, { Authorization: access_token })
        }
    });

    // test.skip(`Get created Organization`, async () => {
    //     let createdOrg = await listOrganization(orgName, { Authorization: access_token });
    //     expect(createdOrg).toContainEqual(orgName);
    // })
})
=======

        await createOrganization(orgName,code, { Authorization: access_token })
    });

    test(`Get created Organization`, async () => {
        let createdOrg = await listOrganization(orgName, { Authorization: access_token });
        expect(createdOrg).toContainEqual(orgName);
    })
})  
>>>>>>> origin/master
