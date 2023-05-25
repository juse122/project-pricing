import { shopData, VAT } from "./data.js";

const channelContainerElement = document.querySelector(".main-output-container");
const priceEntryElement = document.querySelector("#input-price");
const profitEntryElement = document.querySelector("#input-profit");

shopData.forEach(channel => {

    const channelEntry = `
    <div class="main-output-channel">
        <input type="text" class="main-output-channel-value" placeholder="0.00" readonly />
        <p class="main-output-channel-name">${ channel.shopName }</p>
        <div class="main-output-channel-config">
            <p class="main-output-channel-config-provision">${ channel.percentageProvision }% + ${ channel.flatProvision === 0 ? "0.00" : channel.flatProvision }€</p>
            <p class="main-output-channel-config-shipping">Versand: ${ channel.shippingCost === 0 ? "0.00" : channel.shippingCost }€</p>
        </div>
    </div>
    `;

    channelContainerElement.insertAdjacentHTML("beforeend", channelEntry);
});

const calculateSellingPrice = () => {

    const priceValueElements = document.querySelectorAll(".main-output-channel-value");

    for (let i = 0; i < priceValueElements.length; i++) {
        if (priceEntryElement.value == 0 && profitEntryElement.value == 0) {
            
            priceValueElements[i].value = "";

        } else if (shopData[i].shopName === "Cardmarket") {
            
            const percentageValueTotal = (1 - (VAT / (1 + VAT)) - (shopData[i].percentageProvision / 100));
            const percentageValueShipping = (1 - (VAT / (1 + VAT)));

            priceValueElements[i].value = ((Number(priceEntryElement.value) + Number(profitEntryElement.value) + shopData[i].flatProvision - (shopData[i].shippingCost * percentageValueShipping)) / percentageValueTotal).toFixed(2);

        } else {
            
            const percentageValue = (1 - (VAT / (1 + VAT)) - (shopData[i].percentageProvision / 100));

            priceValueElements[i].value = ((Number(priceEntryElement.value) + Number(profitEntryElement.value) + shopData[i].flatProvision - (shopData[i].shippingCost * percentageValue)) / percentageValue).toFixed(2);

        };
    };
};

priceEntryElement.addEventListener("input", calculateSellingPrice);
profitEntryElement.addEventListener("input", calculateSellingPrice);
