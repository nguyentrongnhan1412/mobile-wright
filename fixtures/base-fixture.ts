import { test as base } from '@mobilewright/test';
import { TestStorage } from '@core/utilities/storage-utils';

export const test = base.extend({
    page: async ({ page }, use) => {
        await use(page);
        TestStorage.clear();
    },
});

export { expect } from 'mobilewright';