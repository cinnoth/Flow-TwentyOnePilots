/* const assert = require("assert");
const { Browser, Builder, By, until } = require("selenium-webdriver");

describe("Pruebas del formulario de opiniones", () => {
    let driver;

    before(async () => {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("http://127.0.0.1:3000/src/pages/contacto.html"); // URL del ontenida live server
    });

         it("El formulario debe mostrar un error si el correo no tiene un formato válido", async () =>{
             let botonSubmit = await driver.findElement(By.css(".btn"));
             await driver.executeScript("arguments[0].scrollIntoView(true);", botonSubmit);
             await driver.sleep(1000);


             await driver.findElement(By.id("name")).sendKeys("Tyler Joseph");
             await driver.findElement(By.id("email")).sendKeys("correoinvalido.com");
             await driver.findElement(By.id("motivo")).sendKeys("1");
             await driver.findElement(By.id("mensaje")).sendKeys("Mensaje de prueba");
             await botonSubmit.click();

            let errorEmail = await driver.findElement(By.id("error-email")).getText();
            assert.equal(errorEmail, "Ingrese un correo válido.");
    });

    after(async () => {
        await driver.quit();
    }); 
}); */
