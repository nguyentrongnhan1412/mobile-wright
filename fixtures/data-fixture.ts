import { type test as base } from '@playwright/test';
import { CredentialsProvider } from '@providers/credentials-provider';
import { ProductsProvider } from '@providers/products-provider';

export type DataFixtureType = {
    credentailsProvider: typeof CredentialsProvider;
    productsProvider: typeof ProductsProvider;
};

type ExtendParams = Parameters<typeof base.extend<DataFixtureType>>;

export const dataFixture: ExtendParams[0] = {
    credentailsProvider: async ({}, use) => {
        await use(CredentialsProvider);
    },
    productsProvider: async ({}, use) => {
        await use(ProductsProvider);
    },
};

export { expect } from 'mobilewright';