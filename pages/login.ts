import { Screen } from "mobilewright";
import { Base } from "./base";
import { Element } from "@core/element/element";


export class Login extends Base {
    readonly usernameInput: Element;
    readonly passwordInput  : Element;
    readonly loginButton : Element;
    readonly usernameErrorMessage : Element;
    readonly passwordErrorMessage : Element;

    constructor(screen: Screen) {
       super(screen);
       this.usernameInput = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/nameET')});
       this.passwordInput = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/passwordET')});
       this.loginButton = new Element({locator: screen.getByLabel('Tap to login with given credentials')});
       this.usernameErrorMessage = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/nameErrorTV')});
       this.passwordErrorMessage = new Element({locator: screen.getByTestId('com.saucelabs.mydemoapp.android:id/passwordErrorTV')});
    }

    async login(username: string, password: string) : Promise<void> {
        await this.usernameInput.enterText(username);
        await this.passwordInput.enterText(password);
        await this.loginButton.tap();
    }

    async getUsernameErrorMessage() : Promise<string> {
        return await this.usernameErrorMessage.getText();
    }

    async getPasswordErrorMessage() : Promise<string> {
        return await this.passwordErrorMessage.getText();
    }
}