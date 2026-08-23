import { test as baseTest} from './base-fixture';
import { PageFixtureType, pageFixture } from './page-fixture';
import { DataFixtureType, dataFixture } from './data-fixture';

export const testMain = baseTest.extend<PageFixtureType & DataFixtureType>({
    ...pageFixture,
    ...dataFixture
})

export const base = baseTest;
export const expectMain = base.expect;