import { testMain as test } from '@fixtures/main-fixture';
import { CredentialsProvider } from '@providers/credentials-provider';
import { ProductsProvider } from '@providers/products-provider';
import { Product } from '@models/product';

test.describe('Cart', () => {
    test.beforeEach(async ({ base }) => {
        await test.step('Open the side menu and go to the login screen', async () => {
            await base.appBar.accessSideMenu();
            await base.sideMenu.accessLogin();
        });
    });

    test('add multiple products to cart and verify cart contents', async ({
        login,
        base,
        catalog,
        productDetails,
        cart,
    }) => {
        const account = CredentialsProvider.getAccount('AUTH');

        await test.step('Log in with valid credentials', async () => {
            await login.login(account.username, account.password);
        });

        const expectedProducts = ProductsProvider.getProducts(['Product 1']);

        for (const expectedProduct of expectedProducts) {
            await test.step(`Add "${expectedProduct.productName}" to the cart (qty: ${expectedProduct.productAmount})`, async () => {
                await catalog.accessProductDetail(expectedProduct.productName);
                await productDetails.addProductToCartWithDefinedAmountAndReturn(expectedProduct.productAmount);
            });
        }

        await test.step('Open the cart', async () => {
            await base.appBar.accessCart();
        });

        const actualProducts = await test.step('Read the products listed in the cart', async () => {
            const products = [];
            for (let i = 0; i < expectedProducts.length; i++) {
                products.push(await cart.getProduct(i));
            }
            return products;
        });

        await test.step('Verify the cart contents match the expected products', async () => {
            Product.assertListEqual(actualProducts, expectedProducts);
        });
    });
});
