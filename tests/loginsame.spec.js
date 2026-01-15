const{test,expect}=require('@playwright/test');
test.describe('SauceDemo login Tests', ()=>{
  test('Valid login should navigate to products page', async ({page})=>{
    await page.goto('https://www.saucedemo.com');

    await expect(page).toHaveTitle("Swag Labs")

    await page.locator('#user-name').type('standard_user',{delay:200});
    await page.locator('#password').type('secret_sauce',{delay:200});
    await page.locator('#login-button').click();
     
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator("//div[@class='app_logo']")).toHaveText("Swag Labs")
    await expect(page.locator("//span[@class='title']")).toHaveText("Products")
    await page.waitForTimeout(2000)

  });
  test("invalid credentials",async ({page})=>{
    await page.goto("https://www.saucedemo.com")
    await page.locator('#user-name').type('Tushar',{delay:200});
    await page.locator('#password').type('Tushar',{delay:200});
    await page.locator('#login-button').click();

    await expect(page.locator("//h3[contains(text(),'Epic sadface: Username and password do not match a')]")).toHaveText("Epic sadface: Username and password do not match any user in this service")
    await page.waitForTimeout(2000)


  })
 test("blank values submission", async ({ page }) => {
    await page.goto("https://www.saucedemo.com");

    await page.locator('#login-button').click();

    const errorMsg = page.locator("[data-test='error']");
    await expect(errorMsg).toContainText("Epic sadface: Username is required");

    await page.locator("[data-test='error-button']").click();
    await page.waitForTimeout(2000)
    await expect(errorMsg).not.toBeVisible();
    

  })
})