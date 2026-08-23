import { Locator, expect } from 'mobilewright';

export class Element {
    readonly locator: Locator;

    constructor({ locator }: { locator: Locator; }) {
        this.locator = locator;
    }

    async enterText(text: string) {
        await this.locator.clear();
        if (text) {
            await this.locator.fill(text);
        }
    }

    async tap() {
        await this.waitUntilVisible();
        await this.locator.tap();
    }

    async waitUntilVisible(timeout?: number, message?: string) {
        await expect(this.locator, message).toBeVisible({ timeout });
    }

    async waitUntilHidden(timeout?: number, message?: string) {
        await expect(this.locator, message).toBeHidden({ timeout });
    }

    async getText() {
        return await this.locator.getText();
    }

    nth(index: number): Element {
        return new Element({ locator: this.locator.nth(index) });
    }
}