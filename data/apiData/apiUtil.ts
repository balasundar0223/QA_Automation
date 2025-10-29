import { environmentSetup } from '../../playwright.config';
export let URLConstants: any
export let credentials: any
switch (environmentSetup) {

    case "qa":
        URLConstants = {
            adminEndPointUrl: "https://qa.expertusoneqa.com/api/v2/admin/rest",
            learnerEndPointUrl: "https://qa.expertusoneqa.com/api/v2/learner/rest"
        }
        credentials = {
            data: {
              //  id: "cbd3c1f9-b4f7-49b3-8436-e45ab428bdb0",
              id: "b3727c29-6bbc-4bc3-8276-8b232ec70222",
                client_id: "38f78440b5e4693f47361d3e5c0c80b9",
                client_secret: "ec7905d0fc328980352675c79fceaa66"
            }

        }

        break;
    case "automation":
        URLConstants = {
<<<<<<< HEAD
            adminEndPointUrl: "https://qaprod1.expertusoneqa.cloud/api/v2/admin/rest",
=======
            adminEndPointUrl: "https://automation.expertusoneqa.in/api/v2/admin/rest",
>>>>>>> origin/master
            learnerEndPointUrl: "https://automation.expertusoneqa.in/api/v2/learner/e1internal/rest"
        }
        credentials = {
            data: {
<<<<<<< HEAD
                id: "bfe81f18-bad3-473e-a2da-f339261d7965",
                client_id: "e6352f6f5b051665f869243c63636a86",
                client_secret: "2cb2c9fdef1f80fb47be06f27074870f"
=======
                id: "b3727c29-6bbc-4bc3-8276-8b232ec70222",
                client_id: "38f78440b5e4693f47361d3e5c0c80b9",
                client_secret: "ec7905d0fc328980352675c79fceaa66"
>>>>>>> origin/master
            }

        }

        break;
    case "qaProduction":
        URLConstants = {
<<<<<<< HEAD
            adminEndPointUrl: "https://lms.expertusoneqa.cloud/api/v2/admin/rest",
            learnerEndPointUrl: "https://lms.expertusoneqa.cloud/api/v2/learner/rest"
        }
        credentials = {
            data: {
                id: "130c633d-3696-49b3-ba6a-8c21a1edbf35",
                client_id: "cb06d914b1ae804a364f4bc8458652c0",
                client_secret: "bb29151cf0ae772fa08c58004fb8e42a"
=======
            adminEndPointUrl: "https://qaautomation.expertusoneqa.cloud/api/v2/admin/rest",
            learnerEndPointUrl: "https://qaautomation.expertusoneqa.cloud/api/v2/learner/rest"
        }
        credentials = {
            data: {
                id: "5f469f06-23a4-448c-9066-fee689ed0a93",
                client_id: "d8f7b0e5d9485b712e7342bcf46e8ea5",
                client_secret: "c7640afa8a8ea9c988c37afbadbf13fd"
>>>>>>> origin/master
            }

        }

        break;
    case "dev":
        URLConstants = {
            adminEndPointUrl: "https://qa.expertusoneqa.com/api/v2/admin/rest",
            learnerEndPointUrl: "https://qa.expertusoneqa.com/api/v2/learner/rest"
        }
        credentials = {
            data: {
                id: "b3727c29-6bbc-4bc3-8276-8b232ec70222",
                client_id: "38f78440b5e4693f47361d3e5c0c80b9",
                client_secret: "ec7905d0fc328980352675c79fceaa66"
            }

        }

        break;
    default:
        throw new Error(`Invalid environment setup: ${environmentSetup}`);
}
