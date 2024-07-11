import { $ } from '@wdio/globals'
import BasePage from './BasePageObject';


class InventoryPage extends BasePage {

  get swagLabsHeader() {
    return $('[data-test="primary-header"]');
  }

  get addToCartButtons() {
    return $$('[data-test*="add-to-cart"]');
  }

  get swagLabsIconText() {
    return $('.app_logo');
  }

  get inventoryContainer() {
    return $('.inventory_container');
  }

  get shoppingCartBadge() {
    return $('.shopping_cart_badge');
  }

  get shoppingCartButton() {
    return $('.shopping_cart_link');
  }

  async waitForInventoryPageToBeDisplayed() {
    console.log(
      '- Waiting for Inventory Page to be displayed',
    );
    return this.swagLabsHeader.waitForDisplayed();
  }

  async waitForInventoryContainerToBeDisplayed() {
    console.log(
      '- Waiting for Inventory Container to be displayed',
    );
    return this.inventoryContainer.waitForDisplayed();
  }

  async getSwagLabsTitle() {
    console.log('- Getting Inventory Page Title');
    return this.swagLabsIconText.getText();
  }

  async clickOnAddToCartButton() {
    console.log(`- Clicking on first 3 Add to Cart buttons`);
    const buttons = await this.addToCartButtons;
    for (const button of buttons.slice(0, 3)) {
      await button.waitForClickable();
      await button.click();
    }
  }

  async getShoppingCartCount() {
    console.log('- Getting text of shopping cart badge')
    await this.shoppingCartBadge.waitForDisplayed();
    return this.shoppingCartBadge.getText();
  }

  async clickOnShoppingCartButton() {
    console.log('- Clicking on Shopping Cart Button');
    await this.shoppingCartButton.waitForClickable();
    return this.shoppingCartButton.click();
  }

  async waitForAddToCartButtonsCountToBe(expectedCount: number, timeout = 5000) {
    console.log(`- Waiting for exactly ${expectedCount} Add to Cart buttons to be visible`);

    await browser.waitUntil(async () => {
      const buttons = await this.addToCartButtons;
      const correctCount = buttons.length === expectedCount;
      const allVisible = buttons.every(async (button) => await button.isDisplayed());
      return correctCount && allVisible;
    }, {
      timeout: timeout,
      timeoutMsg: `Expected ${expectedCount} add to cart buttons to be visible within ${timeout} ms`
    });
  }
}

export default new InventoryPage();
