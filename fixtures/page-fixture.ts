import { Base } from '@pages/base';
import { type test as base } from '@mobilewright/test';
import { Cart } from '@pages/cart';
import { Catalog } from '@pages/catalog';
import { Login } from '@pages/login';
import { ProductDetails } from '@pages/product-details';

export type PageFixtureType = {
    base: Base;
    cart: Cart;
    catalog: Catalog;
    login: Login;
    productDetails: ProductDetails;
};

type ExtendParams = Parameters<typeof base.extend<PageFixtureType>>;

export const pageFixture: ExtendParams[0] = {
    base: async ({ screen }, use) => {
        await use(new Base(screen));
    },
    cart: async ({ screen }, use) => {
        await use(new Cart(screen));
    },
    catalog: async ({ screen }, use) => {
        await use(new Catalog(screen));
    },
    login: async ({ screen }, use) => {
        await use(new Login(screen));
    },
    productDetails: async ({ screen }, use) => {
        await use(new ProductDetails(screen));
    }, 
};

export { expect } from 'mobilewright';