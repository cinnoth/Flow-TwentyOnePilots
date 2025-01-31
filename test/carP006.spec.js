const assert = require("assert");
const { Builder, Browser, By, until } = require("selenium-webdriver");

describe("Pruebas del carrito de compras", () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("http://127.0.0.1:5501/src/pages/compras.html");
    });

     it("Verificar que agregar varias veces el mismo producto actualiza la cantidad en el carrito", async () =>{
        let botonAgregar = await driver.findElement(By.css(".productos__container-card:nth-child(1) .addCarBtn"));
        await driver.executeScript("window.scrollBy(0, arguments[0].getBoundingClientRect().top - 100);", botonAgregar);
        await driver.sleep(1000);
        await botonAgregar.click();
        await botonAgregar.click();

        let botonCarrito = await driver.findElement(By.id("boton-carrito"))
        await botonCarrito.click();

        let cantidadInput = await driver.wait(until.elementLocated(By.css(".listado-carrito .cantidad")), 5000);
        let cantidad = await cantidadInput.getAttribute("value");

        assert.equal(cantidad, "2");
    })
     after(async () => {
        await driver.quit();
    })
});