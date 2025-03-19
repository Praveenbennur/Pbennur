const { expect } = require('@playwright/test');
class ProductPage {

    constructor(page) {
        this.page = page;
        //verifying that products page is launched successfully
        expect(page.locator(".title")).toHaveText("Products");
        console.log("Product page is launched successfully");

    }

    async addToCart() {

    }
}

module.exports = { ProductPage };