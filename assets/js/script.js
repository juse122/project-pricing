import { shopData, VAT } from "./data.js";
import { showModal } from "./modal.js";

const purchasePriceButtonElement = document.querySelector("#ek");
const sellingPriceButtonElement = document.querySelector("#vk");
const inputContainerElement = document.querySelector(".main-input-container");
const channelContainerElement = document.querySelector(".main-output-container");

let firstInputElement;
let secondInputElement;

let firstNetButtonElement;
let firstGrossButtonElement;
let secondNetButtonElement;
let secondGrossButtonElement;



// Set footer copyright year //

document.querySelector("#copyright-year").innerText = new Date().getFullYear();



// Purchase price calculation functionality //

const generatePurchasePriceEntries = () => {
    inputContainerElement.innerHTML = `
    <div class="main-input-field-wrapper">
        <div class="main-input-field">
            <label for="input-1">Einkaufspreis<br />in Euro</label>
            <input type="number" name="price" id="input-1" placeholder="0.00" />
            <div class="main-input-field-switch-wrapper">
                <button id="net-1" class="main-input-field-switch active">netto</button>
                <button id="gross-1" class="main-input-field-switch">brutto</button>
            </div>
        </div>
        <div class="main-input-field">
            <label for="input-2">Gewinn<br />in Euro</label>
            <input type="number" name="profit" id="input-2" placeholder="0.00" />
            <div class="main-input-field-switch-wrapper">
                <button id="net-1" class="main-input-field-switch active">netto</button>
            </div>
        </div>
    </div>
    `;
    
    channelContainerElement.innerHTML = `
    <div class="main-output-headline-wrapper">
        <h2 class="main-output-headline">Verkaufspreis in Euro (brutto)</h2>
        <button id="settings" class="main-output-headline-button"><i class="fa-solid fa-gear"></i></button>
    </div>
    `;
    
    shopData.forEach(channel => {

    const channelEntry = `
    <div class="main-output-channel">
        <input type="text" name="channel-output-value" class="main-output-channel-value" placeholder="0.00" readonly />
        <p class="main-output-channel-name">${ channel.shopName }</p>
        <div class="main-output-channel-config">
            <p class="main-output-channel-config-provision">${ channel.percentageProvision.toFixed(2) }% + ${ channel.flatProvision.toFixed(2) }€</p>
            <p class="main-output-channel-config-shipping">Versand: ${ channel.shippingCost.toFixed(2) }€</p>
        </div>
    </div>
    `;

    channelContainerElement.insertAdjacentHTML("beforeend", channelEntry);
    });

    firstInputElement = document.querySelector("#input-1");

    firstInputElement.addEventListener("focusin", () => firstInputElement.value = "");
    firstInputElement.addEventListener("focusout", () => {
        if (firstInputElement.value === "") {
            firstInputElement.value = "0.00";
        } else if (!/[,.]\d{2,}/.test(firstInputElement.value)) {
            firstInputElement.value = Number(firstInputElement.value).toFixed(2);
        };

        calculateSellingPrice();
    });

    firstInputElement.addEventListener("input", calculateSellingPrice);
    firstInputElement.removeEventListener("input", calculateProfit);

    secondInputElement = document.querySelector("#input-2");

    secondInputElement.addEventListener("focusin", () => secondInputElement.value = "");
    secondInputElement.addEventListener("focusout", () => {
        if (secondInputElement.value === "") {
            secondInputElement.value = "0.00";
        } else if (!/[,.]\d{2,}/.test(secondInputElement.value)) {
            secondInputElement.value = Number(secondInputElement.value).toFixed(2);
        };

        calculateSellingPrice();
    });

    secondInputElement.addEventListener("input", calculateSellingPrice);
    secondInputElement.removeEventListener("input", calculateProfit);

    firstNetButtonElement = document.querySelector("#net-1");
    firstGrossButtonElement = document.querySelector("#gross-1");

    firstNetButtonElement.addEventListener("click", () => {
        if (!firstNetButtonElement.classList.contains("active")) {
            firstNetButtonElement.classList.add("active");
        };

        firstGrossButtonElement.classList.remove("active");
        
        calculateSellingPrice();
    });

    firstGrossButtonElement.addEventListener("click", () => {
        if (!firstGrossButtonElement.classList.contains("active")) {
            firstGrossButtonElement.classList.add("active");
        };

        firstNetButtonElement.classList.remove("active");
        
        calculateSellingPrice();
    });

    const settingsButtonElement = document.querySelector("#settings");
    settingsButtonElement.addEventListener("click", showModal);
};



const calculateSellingPrice = () => {

    const priceValueElements = document.querySelectorAll(".main-output-channel-value");

    for (let i = 0; i < priceValueElements.length; i++) {
        if (firstInputElement.value == 0 && secondInputElement.value == 0) {
            
            priceValueElements[i].value = "";

        } else if (firstNetButtonElement.classList.contains("active")) {
            if (shopData[i].shopName === "Cardmarket") {
            
                const percentageValue = (1 - (VAT.value / (1 + VAT.value)) - (shopData[i].percentageProvision / 100))

                priceValueElements[i].value = ((Number(firstInputElement.value) + Number(secondInputElement.value) + shopData[i].flatProvision) / percentageValue - (shopData[i].shippingCost > 4.99 ? (shopData[i].shippingCost - 4.99) / (1 - (shopData[i].percentageProvision / 100)) : 0)).toFixed(2);

            } else {
                
                const percentageValue = (1 - (VAT.value / (1 + VAT.value)) - (shopData[i].percentageProvision / 100))

                priceValueElements[i].value = ((Number(firstInputElement.value) + Number(secondInputElement.value) + (shopData[i].shippingCost * (shopData[i].percentageProvision / 100)) + shopData[i].flatProvision) / percentageValue + (shopData[i].shippingCost < 4.99 ? ((4.99 - shopData[i].shippingCost) / (1 - (shopData[i].percentageProvision / 100) * (1 + VAT.value))) : 0)).toFixed(2);

            };
        } else {
            if (shopData[i].shopName === "Cardmarket") {
            
                const percentageValue = (1 - (VAT.value / (1 + VAT.value)) - (shopData[i].percentageProvision / 100))

                priceValueElements[i].value = ((Number(firstInputElement.value / (1 + VAT.value)) + Number(secondInputElement.value) + shopData[i].flatProvision) / percentageValue - (shopData[i].shippingCost > 4.99 ? (shopData[i].shippingCost - 4.99) / (1 - (shopData[i].percentageProvision / 100)) : 0)).toFixed(2);

            } else {
                
                const percentageValue = (1 - (VAT.value / (1 + VAT.value)) - (shopData[i].percentageProvision / 100))

                priceValueElements[i].value = ((Number(firstInputElement.value / (1 + VAT.value)) + Number(secondInputElement.value) + (shopData[i].shippingCost * (shopData[i].percentageProvision / 100)) + shopData[i].flatProvision) / percentageValue + (shopData[i].shippingCost < 4.99 ? ((4.99 - shopData[i].shippingCost) / (1 - (shopData[i].percentageProvision / 100) * (1 + VAT.value))) : 0)).toFixed(2);

            };
        };
    };
};



// Selling price calculation functionality //

const generateSellingPriceEntries = () => {
    inputContainerElement.innerHTML = `
    <div class="main-input-field-wrapper">
        <div class="main-input-field">
            <label for="input-1">Verkaufsspreis<br />in Euro</label>
            <input type="number" name="selling-price" id="input-1" placeholder="0.00" />
            <div class="main-input-field-switch-wrapper">
                <button id="gross-1" class="main-input-field-switch active">brutto</button>
            </div>
        </div>
        <div class="main-input-field">
            <label for="input-2">Einkaufspreis<br />in Euro</label>
            <input type="number" name="purchase-price" id="input-2" placeholder="0.00" />
            <div class="main-input-field-switch-wrapper">
                <button id="net-2" class="main-input-field-switch active">netto</button>
                <button id="gross-2" class="main-input-field-switch">brutto</button>
            </div>
        </div>
    </div>
    `;
    
    channelContainerElement.innerHTML = `
    <div class="main-output-headline-wrapper">
        <h2 class="main-output-headline">Gewinn in Euro (netto)</h2>
        <button id="settings" class="main-output-headline-button"><i class="fa-solid fa-gear"></i></button>
    </div>
    `;
    
    shopData.forEach(channel => {

    const channelEntry = `
    <div class="main-output-channel">
        <input type="text" name="channel-output-value" class="main-output-channel-value" placeholder="0.00" readonly />
        <p class="main-output-channel-name">${ channel.shopName }</p>
        <div class="main-output-channel-config">
            <p class="main-output-channel-config-provision">${ channel.percentageProvision.toFixed(2) }% + ${ channel.flatProvision.toFixed(2) }€</p>
            <p class="main-output-channel-config-shipping">Versand: ${ channel.shippingCost.toFixed(2) }€</p>
        </div>
    </div>
    `;

    channelContainerElement.insertAdjacentHTML("beforeend", channelEntry);
    });

    firstInputElement = document.querySelector("#input-1");

    firstInputElement.addEventListener("focusin", () => firstInputElement.value = "");
    firstInputElement.addEventListener("focusout", () => {
        if (firstInputElement.value === "") {
            firstInputElement.value = "0.00";
        } else if (!/[,.]\d{2,}/.test(firstInputElement.value)) {
            firstInputElement.value = Number(firstInputElement.value).toFixed(2);
        };

        calculateProfit();
    });

    firstInputElement.addEventListener("input", calculateProfit);
    firstInputElement.removeEventListener("input", calculateSellingPrice);

    secondInputElement = document.querySelector("#input-2");

    secondInputElement.addEventListener("focusin", () => secondInputElement.value = "");
    secondInputElement.addEventListener("focusout", () => {
        if (secondInputElement.value === "") {
            secondInputElement.value = "0.00";
        } else if (!/[,.]\d{2,}/.test(secondInputElement.value)) {
            secondInputElement.value = Number(secondInputElement.value).toFixed(2);
        };

        calculateProfit();
    });

    secondInputElement.addEventListener("input", calculateProfit);
    secondInputElement.removeEventListener("input", calculateSellingPrice);

    secondNetButtonElement = document.querySelector("#net-2");
    secondGrossButtonElement = document.querySelector("#gross-2");

    secondNetButtonElement.addEventListener("click", () => {
        if (!secondNetButtonElement.classList.contains("active")) {
            secondNetButtonElement.classList.add("active");
        };

        secondGrossButtonElement.classList.remove("active");
        
        calculateProfit();
    });

    secondGrossButtonElement.addEventListener("click", () => {
        if (!secondGrossButtonElement.classList.contains("active")) {
            secondGrossButtonElement.classList.add("active");
        };

        secondNetButtonElement.classList.remove("active");
        
        calculateProfit();
    });

    const settingsButtonElement = document.querySelector("#settings");
    settingsButtonElement.addEventListener("click", showModal);
};



const calculateProfit = () => {

    const priceValueElements = document.querySelectorAll(".main-output-channel-value");

    for (let i = 0; i < priceValueElements.length; i++) {
        if (firstInputElement.value == 0 && secondInputElement.value == 0) {
            
            priceValueElements[i].value = "";

        } else if (secondNetButtonElement.classList.contains("active")) {
            if (shopData[i].shopName === "Cardmarket") {

                const channelProvision = Number(firstInputElement.value) * (shopData[i].percentageProvision / 100);

                priceValueElements[i].value = (Number(firstInputElement.value) / (1 + VAT.value) - channelProvision - shopData[i].flatProvision - Number(secondInputElement.value) + (shopData[i].shippingCost > 4.99 ? (shopData[i].shippingCost - 4.99) / (1 + VAT.value) : 0)).toFixed(2);
            } else {

                const channelProvision = (Number(firstInputElement.value) + shopData[i].shippingCost) * (shopData[i].percentageProvision / 100);

                priceValueElements[i].value = (Number(firstInputElement.value) / (1 + VAT.value) - channelProvision - shopData[i].flatProvision - Number(secondInputElement.value) - (shopData[i].shippingCost < 4.99 ? (4.99 - shopData[i].shippingCost) / (1 + VAT.value) : 0)).toFixed(2);
            };
        } else {
            if (shopData[i].shopName === "Cardmarket") {

                const channelProvision = Number(firstInputElement.value) * (shopData[i].percentageProvision / 100);

                priceValueElements[i].value = (Number(firstInputElement.value) / (1 + VAT.value) - channelProvision - shopData[i].flatProvision - Number(secondInputElement.value / (1 + VAT.value)) + (shopData[i].shippingCost > 4.99 ? (shopData[i].shippingCost - 4.99) / (1 + VAT.value) : 0)).toFixed(2);
            } else {

                const channelProvision = (Number(firstInputElement.value) + shopData[i].shippingCost) * (shopData[i].percentageProvision / 100);

                priceValueElements[i].value = (Number(firstInputElement.value) / (1 + VAT.value) - channelProvision - shopData[i].flatProvision - Number(secondInputElement.value / (1 + VAT.value)) - (shopData[i].shippingCost < 4.99 ? (4.99 - shopData[i].shippingCost) / (1 + VAT.value) : 0)).toFixed(2);
            };
        };
    };
};



// Event listener //

purchasePriceButtonElement.addEventListener("click", () => {
    if (!purchasePriceButtonElement.classList.contains("active")) {
        purchasePriceButtonElement.classList.add("active");
    };

    sellingPriceButtonElement.classList.remove("active");
    
    generatePurchasePriceEntries();
});

sellingPriceButtonElement.addEventListener("click", () => {
    if (!sellingPriceButtonElement.classList.contains("active")) {
        sellingPriceButtonElement.classList.add("active");
    };

    purchasePriceButtonElement.classList.remove("active");
    
    generateSellingPriceEntries();
});



// Initial element generation //

generatePurchasePriceEntries();



// Export //

export { purchasePriceButtonElement, generatePurchasePriceEntries, generateSellingPriceEntries };
