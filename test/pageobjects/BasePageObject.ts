import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {

    static open(path: string) {
        return browser.url(`${path}`)
    }

    get inventoryItemName() {
        return $$('.inventory_item_name');
    }

    get inventoryItemDescription() {
        return $$('.inventory_item_desc');
    }

    get inventoryItemPrice() {
        return $$('.inventory_item_price');
    }

    get title() {
        return $('.title');
    }

    get openMenuButton() {
        return $('#react-burger-menu-btn');
    }

    get logoutButton() {
        return $('[data-test="logout-sidebar-link"]');
    }


    async getItemName(index: number, page: string) {
        console.log(`- Getting item name for product ${index + 1} on ${page}`);
        await this.inventoryItemName[index].waitForDisplayed();
        return this.inventoryItemName[index].getText();
    }

    async getItemDescription(index: number, page: string) {
        console.log(`- Getting item description for product ${index + 1} on ${page}`);
        await this.inventoryItemDescription[index].waitForDisplayed();
        return this.inventoryItemDescription[index].getText();
    }

    async getItemPrice(index: number, page: string) {
        console.log(`- Getting item price for product ${index + 1} on ${page}`);
        await this.inventoryItemPrice[index].waitForDisplayed();
        return this.inventoryItemPrice[index].getText();
    }

    async getPageTitle(){
        console.log('- Getting page title');
        await this.title.waitForDisplayed();
        return this.title.getText();
    }

    async clickOnOpenMenuButton() {
        console.log('- Clicking on Open Menu Button');
        await this.openMenuButton.waitForClickable();
        return this.openMenuButton.click();
    }

    async clickOnLogoutButton() {
        console.log('- Clicking on Logout Button');
        await this.logoutButton.waitForClickable();
        return this.logoutButton.click();
    }
}
