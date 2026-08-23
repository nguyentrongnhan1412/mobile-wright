import { testMain as test } from '@fixtures/main-fixture';
import { expect } from 'mobilewright';
import { CredentialsProvider } from '@providers/credentials-provider';
import { MESSAGES } from '@constants/messages';

test.describe('Login', () => {
    test.beforeEach(async ({ base }) => {
        await test.step('Open the side menu and go to the login screen', async () => {
            await base.appBar.accessSideMenu();
            await base.sideMenu.accessLogin();
        });
    });

    test('login successfully with valid credentials', async ({ login, base }) => {
        const account = CredentialsProvider.getAccount('AUTH');

        await test.step('Log in with valid credentials', async () => {
            await login.login(account.username, account.password);
        });

        await test.step('Verify the logout option is visible in the side menu', async () => {
            await base.appBar.accessSideMenu();
            await expect(base.sideMenu.logoutOption.locator).toBeVisible();
        });
    });

    test('login fails with empty username', async ({ login }) => {
        const account = CredentialsProvider.getAccount('EMPTYUSERNAME');

        await test.step('Attempt to log in with an empty username', async () => {
            await login.login(account.username, account.password);
        });

        await test.step('Verify the missing username error message is shown', async () => {
            expect(await login.getUsernameErrorMessage()).toBe(MESSAGES.LOGIN.MISSING_USERNAME);
        });
    });

    test('login fails with empty password', async ({ login }) => {
        const account = CredentialsProvider.getAccount('EMPTYPASSWORD');

        await test.step('Attempt to log in with an empty password', async () => {
            await login.login(account.username, account.password);
        });

        await test.step('Verify the missing password error message is shown', async () => {
            expect(await login.getPasswordErrorMessage()).toBe(MESSAGES.LOGIN.MISSING_PASSWORD);
        });
    });
});
