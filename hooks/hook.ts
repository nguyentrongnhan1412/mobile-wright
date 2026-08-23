import { TestStorage } from "@core/utilities/storage-utils";
import { expectMain, testMain } from "@fixtures/main-fixture";

export const test = testMain;
export const expect = expectMain;

test.beforeAll(async () => {
    console.log('Before Test');
});

test.beforeEach('Go to Application', async () => {
    console.log(`Running ${test.info().title} test`);
});

test.afterEach('After Test', async () => {
    console.log(`${test.info().title} with status ${test.info().status}`);
    TestStorage.clear();
});

test.afterAll(async () => {
    console.log('After All tests');
});