import { Screen } from "mobilewright";
import { Base } from "./base";
import { Element } from "@core/element/element";


export class Catalog extends Base {

    constructor(screen: Screen) {
       super(screen);
    }

    catalogProduct(productName: string): Element {
       return new Element({locator: this.screen
        .xpath(`//android.widget.TextView[@content-desc='Product Title' and @text='${productName}']/preceding-sibling::android.widget.ImageView[@content-desc='Product Image']`)
       });
    }

    async accessProductDetail(productName: string) : Promise<void> {
        const targetedProduct = this.catalogProduct(productName);
        await targetedProduct.tap();
    }

}