import { Element } from "@core/element/element";
import { Screen } from "mobilewright";

export class SideMenu {
    readonly catalogOption  : Element;
    readonly loginOption  : Element;
    readonly logoutOption: Element;

    constructor(screen: Screen) {
        this.catalogOption = new Element({ locator: screen.getByText('Catalog')});
        this.loginOption = new Element({ locator: screen.getByLabel('Login Menu Item')});
        this.logoutOption = new Element({ locator: screen.getByLabel('Logout Menu Item')});
    }

    async accessCatalog() : Promise<void> {
        await this.catalogOption.tap();
    }

    async accessLogin() : Promise<void> {
        await this.loginOption.tap();
    }    
}