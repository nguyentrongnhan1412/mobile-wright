import { AppBar } from "@pages/components/app-bar";
import { SideMenu } from "@pages/components/side-menu";
import { Screen } from "mobilewright";


export class Base {
    readonly screen: Screen;
    readonly appBar: AppBar;
    readonly sideMenu: SideMenu;

    constructor(screen: Screen) {
        this.screen = screen;
        this.appBar = new AppBar(screen);
        this.sideMenu = new SideMenu(screen);
    }
}