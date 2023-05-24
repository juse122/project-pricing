import { shopData } from "./data.js";

const channelContainerElement = document.querySelector(".main-output-container");
const priceEntryElement = document.querySelector("#cost");
const profitEntryElement = document.querySelector("#margin");

shopData.forEach(channel => {
    const channelEntry = `
    <div class="main-output-channel">
        <input type="text" class="main-output-channel-value" placeholder="0.00" readonly />
        <p class="main-output-channel-name">${ channel.shopName }</p>
        <div class="main-output-channel-config">
            <p class="main-output-channel-config-provision">${ channel.percentageProvision }% + ${ channel.flatProvision }€</p>
            <p class="main-output-channel-config-shipping">Versand: ${ channel.shippingCost }€</p>
        </div>
    </div>
    `;

    channelContainerElement.insertAdjacentHTML("beforeend", channelEntry);
});

const calculateSellingPrice = () => {
    const priceValueElements = document.querySelectorAll(".main-output-channel-value");

    for (let i = 0; i < channelContainerElement.childElementCount; i++) {
        if (priceEntryElement.value == 0 && profitEntryElement.value == 0) {
            priceValueElements[i].value = "";
        } else {        
        priceValueElements[i].value = Number(((Number(priceEntryElement.value) + Number(profitEntryElement.value)) * (1 + shopData[i].percentageProvision / 100) + shopData[i].flatProvision) * 1.19).toFixed(2);
        };
    };
};

priceEntryElement.addEventListener("input", calculateSellingPrice);
profitEntryElement.addEventListener("input", calculateSellingPrice);
