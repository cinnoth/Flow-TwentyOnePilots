const assert = require("assert");
const { Builder, Browser } = require("selenium-webdriver");
const HeaderPage = require("./pages-test/header");

describe("Validación del header en la página", function () {
    let driver;
    let headerPage;

    before(async function () {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        headerPage = new HeaderPage(driver);
        await headerPage.open(); 
    });

    it("Debe mostrar 'Twenty One Pilots' en el header", async function () {
        const headerText = await headerPage.getHeaderText();
        assert.strictEqual(headerText.includes("Twenty One Pilots |-/"), true, "El texto del header no es el esperado");
    });

    after(async function () {
        await driver.quit();
    });
});
