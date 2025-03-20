const { test, expect } = require('@playwright/test');

test('firstOperationUsingBrowserContext', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https:/rahulShettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("#signInBtn");

    console.log(await page.title());

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill("rahulshetty");
    await password.fill("learn");

    await signIn.click();

    await page.locator("[style*='block']").textContent();

    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("");

    await userName.fill(await page.locator("//*[@id='login-form']/div[7]/p/b[1]/i").textContent());
    await password.fill(await page.locator("//*[@id='login-form']/div[7]/p/b[2]/i").textContent());
    const dropDown = page.locator("select.form-control");
    await dropDown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText")
    await page.locator("[href*='documents-request']").click();
    // await signIn.click();
    // // await expect(page).toHaveTitle("ProtoCommerce");
    // // const productName = page.locator(".card-body a");
    // await page.waitForLoadState('networkidle');
    // console.log(await page.locator(".card-body a").allTextContents());
    await page.pause();
});

test('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");

    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    // await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    // console.log(titles);
    await page.pause();

})

test('firstOperationUsingPage', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https:/rahulShettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),

    ])
    const text = await newPage.locator(".red").textContent();
    console.log('complete line is ' + text);

    const array = text.split("@");
    const domain = array[1].split(" ")[0];
    console.log('domain name is ' + domain)

});


test('@Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    //await page.pause();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind");

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

});


test('@Web Client App buy products', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    //await page.pause();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").type("ind");

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

test('Playwright Special locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

});


test("Flipkart Product prize check", async ({ page }) => {

    page.goto("https://www.flipkart.com/");
    await page.locator(".Pke_EE").click();
    await page.locator(".Pke_EE").fill("iph");

    await page.getByRole('link', { name: 'iphone 14 in Mobiles' }).click();// .first or .last()
    // await  page.locator("(//a[@target='_blank'])[1]").click();
    const iphoneCollection = page.locator("(//a[@target='_blank'])[1]");
    console.log(iphoneCollection.count());
    for (let i = 0; i < await iphoneCollection.count(); i++) {
        console.log('inside for');
        if (await iphoneCollection.nth(i).locator("(//div[contains(text(),'₹56,999')])[1]").textContent() === '₹56,999') {
            console.log('inside if');
            console.log(iphoneCollection.nth(i));
            break;
        }
    }
});

test('testing', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');
    await page.getByPlaceholder('Search for Products, Brands').click();
    await page.getByPlaceholder('Search for Products, Brands').fill('iph');
    await page.getByRole('link', { name: 'iphone 14 in Mobiles' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Bestseller Apple iPhone 14 (Starlight, 128 GB) Add to Compare Apple iPhone 14 (' }).click();
    const page1 = await page1Promise;
    await page1.getByText('₹56,999').first().click();
  });


  test('@Web Client App login and select products', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");

    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    await page.locator("//div[@class='container']//div[1]//div[1]//div[1]//button[2]").click();

    await page.locator("//button[@routerlink='/dashboard/cart']").click();

    ////div[@class='cartSection']

    console.log(await page.locator("//div[@class='cartSection']").count());

})

test.only("Calendar validations",async({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index <inputs.length; index++)
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }`` 
})