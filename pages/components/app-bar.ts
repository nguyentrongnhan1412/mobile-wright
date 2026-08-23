import { Element } from "@core/element/element";
import { Screen } from "mobilewright";

export class AppBar  {
    readonly sideMenuButton : Element;
    readonly cartButton : Element;

    constructor(screen: Screen) {
        this.sideMenuButton = new Element({ locator: screen.getByLabel('View menu')});
        this.cartButton = new Element({ locator: screen.getByLabel('Displays number of items in your cart')});
    }

    async accessSideMenu(timeout: number = 30_000) : Promise<void> {
        await this.sideMenuButton.tap(timeout);
    }

    async accessCart() : Promise<void> {
        await this.cartButton.tap();
    }
}