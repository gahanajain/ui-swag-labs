import { expect } from '@wdio/globals'

import CartPage from '../pageobjects/CartPageObject';
import CheckoutPage from '../pageobjects/CheckoutPageObject';
import InventoryPage from '../pageobjects/InventoryPageObject';
import LoginPage from '../pageobjects/LoginPageObject'
import PersonalInfoPage from '../pageobjects/PersonalInfoPageObject';

import SuccessfulCheckoutConstants from '../constants/SuccessfulCheckoutConstants.json'
import CheckoutCompletePage from '../pageobjects/CheckoutCompletePageObject';

function extractAndConvertNumberFromString(str: string): number {
    const matches = str.match(/\d+\.?\d*/);
    return matches && matches.length > 0 ? parseFloat(matches[0]) : 0;
}

describe('Testing Sauce Demo Website', () => {
    const username = process.env.SAUCELABS_USERNAME as string;
    const password = process.env.SAUCELABS_PASSWORD as string;

    interface Item {
        name: string;
        description: string;
        price: string;
    }

    const items: Item[] = [];
    let subtotal = 0;

    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.waitForLoginPageToBeDisplayed();
        await LoginPage.setUsername(username);
        await LoginPage.setPassword(password);
        await LoginPage.clickOnLoginButton();
        await InventoryPage.waitForInventoryPageToBeDisplayed();
        expect(await InventoryPage.getSwagLabsTitle())
            .toContain(SuccessfulCheckoutConstants.websiteHeader);
    });

    it('should be able to add 3 products in the cart', async () => {
        await InventoryPage.waitForInventoryContainerToBeDisplayed();
        expect(await InventoryPage.getPageTitle())
            .toContain(SuccessfulCheckoutConstants.inventoryPageTitle);
        await InventoryPage.waitForAddToCartButtonsCountToBe(6);
        for (let i = 0; i < 3; i++) {
            const itemName = await InventoryPage.getItemName(i, SuccessfulCheckoutConstants.inventoryPage);
            const itemDescription = await InventoryPage.getItemDescription(i, SuccessfulCheckoutConstants.inventoryPage);
            const itemPrice = await InventoryPage.getItemPrice(i, SuccessfulCheckoutConstants.inventoryPage);

            items.push({
                name: itemName,
                description: itemDescription,
                price: itemPrice
            });
            subtotal += extractAndConvertNumberFromString(itemPrice);
        }
        await InventoryPage.clickOnAddToCartButton();
        expect(await InventoryPage.getShoppingCartCount())
            .toBe("3");
        await InventoryPage.clickOnShoppingCartButton()
    });

    it('should be able to verify correct items added and succesfully checkout from the cart', async () => {
        await CartPage.waitForCartListToBeDisplayed();
        expect(await CartPage.getPageTitle())
            .toContain(SuccessfulCheckoutConstants.cartPageTitle);

        for (let i = 0; i < 3; i++) {
            const cartItemName = await CartPage.getItemName(i, SuccessfulCheckoutConstants.cartPage);
            const cartItemDescription = await CartPage.getItemDescription(i, SuccessfulCheckoutConstants.cartPage);
            const cartItemPrice = await CartPage.getItemPrice(i, SuccessfulCheckoutConstants.cartPage);
            expect(cartItemName).toEqual(items[i].name);
            expect(cartItemDescription).toEqual(items[i].description);
            expect(cartItemPrice).toEqual(items[i].price);
        }
        await CartPage.clickOnCheckoutButton();
    });

    it('should be able to enter all personal information', async () => {
        await PersonalInfoPage.waitForPersonalInfoContainerToBeDisplayed();
        expect(await PersonalInfoPage.getPageTitle())
            .toContain(SuccessfulCheckoutConstants.infoPageTitle);
        await PersonalInfoPage.setFirstName(SuccessfulCheckoutConstants.firstName);
        await PersonalInfoPage.setLastName(SuccessfulCheckoutConstants.lastName);
        await PersonalInfoPage.setZipCode(SuccessfulCheckoutConstants.zipCode);
        await PersonalInfoPage.clickOnContinueButton();
    });

    it('should be able to verify correct subtotal of the items', async () => {
        await CheckoutPage.waitForCheckoutSummaryContainerToBeDisplayed();
        expect(await CheckoutPage.getPageTitle())
            .toContain(SuccessfulCheckoutConstants.checkoutTitle);
        expect(await CheckoutPage.getPaymentInfoValue())
            .toBe(SuccessfulCheckoutConstants.paymentInfo);
        expect(await CheckoutPage.getShippingInfoValue())
            .toBe(SuccessfulCheckoutConstants.shippingInfo);
        expect(await CheckoutPage.getSubtotalValue())
            .toContain(subtotal);
    });

    it('should be able to finish the checkout', async () => {
        await CheckoutPage.clickOnFinishButton();
        await CheckoutCompletePage.waitForCheckoutCompleteContainerToBeDisplayed();
        expect(await CheckoutCompletePage.getPageTitle())
            .toContain(SuccessfulCheckoutConstants.checkoutCompleteTitle);
        expect(await CheckoutCompletePage.getCompleteHeaderValue())
            .toContain(SuccessfulCheckoutConstants.completeHeader);
        await CheckoutCompletePage.clickOnOpenMenuButton();
        await CheckoutCompletePage.clickOnLogoutButton();
        expect(await LoginPage.getVisibilityOfLoginPage())
            .toBe(true);        
    });
})

