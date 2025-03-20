const { expect } = require('@playwright/test');
class ProductPage {

    constructor(page) {
        this.page = page;
        this.page.setDefaultTimeout(10000);
        // verifying that products page is launched successfully
        expect(page.locator(".title")).toHaveText("Products");
        console.log("Product page is launched successfully");

    }

    async selectProduct(productName) {
        try {
            // selecting the product
            await this.page.waitForSelector(".inventory_item");
            const items = this.page.locator("//div[@class='inventory_item']");
            console.log("Items are displayed successfully");
            const count = await items.count();
            console.log(`Found ${count} items`);

            for (let i = 0; i < count; i++) {
                const item = items.nth(i);
                // chaining to find a child element using XPath
                const childElement = item.locator("xpath=.//div[2]/div/a/div");
                if (await childElement.textContent() == productName) {
                    // wait explicitly for the child element to be visible
                    await childElement.waitFor({ state: 'visible' });
                    const text = await childElement.textContent();
                    console.log(`Item ${i + 1} child text: ${text}`);
                    const cart = item.locator("xpath=.//div[2]/div[2]/button");
                    await cart.click();
                    console.log(`Clicked on item ${i + 1}`);
                }
            }
            console.log(`${productName} is selected`);
        } catch (error) {
            console.error("Error in selectProduct:", error);
            throw error;
        }
    }

    async addToCart() {
        // ...existing code...
    }
}

module.exports = { ProductPage };