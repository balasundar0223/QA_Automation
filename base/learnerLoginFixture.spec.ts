import { test } from '../customFixtures/expertusFixture';


<<<<<<< HEAD
test.skip(`Login to Expertus`, async ({ learnerLogin }) => {
=======
test(`Login to Expertus`, async ({ learnerLogin }) => {
>>>>>>> origin/master
  const title = await learnerLogin.getTitle();
  console.log(title)
})