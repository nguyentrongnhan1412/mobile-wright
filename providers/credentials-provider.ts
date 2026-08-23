import { Account } from '@models/account';
import { JsonDataStore } from './json-data-store';

const accountStore = new JsonDataStore<Account>('credential.json');

export const CredentialsProvider = {
    /**
     * Returns credentials for the given key.
     *
     * For the primary "AUTH" account, the username/password are sourced from
     * the TEST_USERNAME / TEST_PASSWORD environment variables when present
     * (populated from GitHub Secrets in CI). This keeps real credentials out
     * of the repository. All other keys (e.g. negative-path fixtures such as
     * EMPTYUSERNAME/EMPTYPASSWORD) always fall back to credential.json.
     */
    getAccount(key: string): Account {
        if (key.toUpperCase() === 'AUTH') {
            const username = process.env.TEST_USERNAME;
            const password = process.env.TEST_PASSWORD;

            if (username && password) {
                return new Account(username, password);
            }
        }

        return accountStore.get(key);
    },
};