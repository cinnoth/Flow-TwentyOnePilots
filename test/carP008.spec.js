const assert = require("assert");
const { Builder, Browser, By, until } = require("selenium-webdriver");

describe("Pruebas del carrito de compras", () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("http://127.0.0.1:5501/src/pages/compras.html");
    });
    
    it("Verificar que todos los productos pueden eliminarse del carrito.", async () => {
        let primerProducto = await driver.findElement(By.css(".productos__container-card:nth-child(1) .addCarBtn"));
        await driver.executeScript("window.scrollBy(0, arguments[0].getBoundingClientRect().top - 100);", primerProducto);
        await driver.sleep(500);
        await primerProducto.click();

        let segundoProducto = await driver.findElement(By.css(".productos__container-card:nth-child(2) .addCarBtn"));
        await driver.executeScript("window.scrollBy(0, arguments[0].getBoundingClientRect().top - 100);", segundoProducto);
        await driver.sleep(500);
        await segundoProducto.click();

        let botonCarrito = await driver.findElement(By.id("boton-carrito"));
        await botonCarrito.click();

        await driver.wait(async () => {
            let items = await driver.findElements(By.css(".listado-carrito .articulo"));
            return items.length === 2;
        }, 3000, "No se encontraron 2 productos en el carrito");

        
        let productosEnCarrito = await driver.findElements(By.css(".listado-carrito .articulo"));
        assert.equal(productosEnCarrito.length, 2, "Deben haber 2 productos en el carrito");

        
        for (let i = 0; i < 2; i++) {
            let botonesEliminar = await driver.findElements(By.css(".quitar"));
            await botonesEliminar[0].click();  
            await driver.sleep(500);  
        }

        await driver.wait(async () => {
            let items = await driver.findElements(By.css(".listado-carrito .articulo"));
            return items.length === 0;
        }, 3000, "El carrito no se vació completamente");

        let productosDespues = await driver.findElements(By.css(".listado-carrito .articulo"));
        assert.equal(productosDespues.length, 0, "El carrito debe estar vacío");
    })

     after(async () => {
        await driver.quit();
   
    })
});