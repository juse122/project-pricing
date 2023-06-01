import { shopData, VAT } from "./data.js";
import { purchasePriceButtonElement, generatePurchasePriceEntries, generateSellingPriceEntries } from "./script.js";

const pageContainerElement = document.querySelector(".page-container");



// Modal element generation //

const generateModal = () => {
    pageContainerElement.insertAdjacentHTML("beforeend", `
    <div class="main-modal-wrapper">
        <div class="main-modal-container">
            <button id="close" class="main-modal-close-button"><i class="fa-solid fa-xmark fa-lg"></i></button>
            <h2 class="main-modal-headline">Einstellungen</h2>
        </div>
    </div>
    `);

    const modalWrapperElement = document.querySelector(".main-modal-wrapper");
    const modalContainerElement = document.querySelector(".main-modal-container");

    shopData.forEach(channel => {

    const channelEntry = `
    <div class="main-modal-entry">
        <p class="main-modal-channel-name">${ channel.shopName }</p>
        <div class="main-modal-channel-data-wrapper">
            <div class="main-modal-channel-data-entry">
                <label for="provision-percentage-shop-${ channel.shopID }">Provision %</label>
                <input type="number" name="provision-percentage" id="provision-percentage-shop-${ channel.shopID }" value=${ channel.percentageProvision.toFixed(2) } />
            </div>
            <div class="main-modal-channel-data-entry">
                <label for="provision-flat-shop-${ channel.shopID }">Provision €</label>
                <input type="number" name="provision-flat" id="provision-flat-shop-${ channel.shopID }" value=${ channel.flatProvision.toFixed(2) } />
            </div>
            <div class="main-modal-channel-data-entry">
                <label for="shipping-shop-${ channel.shopID }">Versand €</label>
                <input type="number" name="shipping" id="shipping-shop-${ channel.shopID }" value=${ channel.shippingCost.toFixed(2) } />
            </div>
        </div>
    </div>
    `;

    modalContainerElement.insertAdjacentHTML("beforeend", channelEntry);
    });

    modalContainerElement.insertAdjacentHTML("beforeend", `
    <div class="main-modal-vat-entry">
        <label for="vat-data">Umsatzsteuer %</label>
        <input type="number" name="vat" id="vat-data" value=${ VAT.value.toFixed(2) } />
    </div>
    <div class="main-modal-save-button-wrapper">
        <button class="main-modal-save-button">Speichern</button>
        <button class="main-modal-abort-button">Abbrechen</button>
    </div>
    `);

    const modalCloseElement = document.querySelector(".main-modal-close-button");
    const modalAbortElement = document.querySelector(".main-modal-abort-button");
    
    modalWrapperElement.addEventListener("click", () => {
        modalWrapperElement.style.display = "none";
        document.body.style.overflow = "visible";
    });

    modalContainerElement.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    modalCloseElement.addEventListener("click", () => {
        modalWrapperElement.style.display = "none";
        document.body.style.overflow = "visible";
    });

    modalAbortElement.addEventListener("click", () => {
        modalWrapperElement.style.display = "none";
        document.body.style.overflow = "visible";
    });



    // Save modal changes //

    const modalSaveElement = document.querySelector(".main-modal-save-button");

    const saveChanges = () => {
        for (let i = 0; i < shopData.length; i++) {
            shopData[i].percentageProvision = Number(document.querySelector(`#provision-percentage-shop-${ i }`).value);
            shopData[i].flatProvision = Number(document.querySelector(`#provision-flat-shop-${ i }`).value);
            shopData[i].shippingCost = Number(document.querySelector(`#shipping-shop-${ i }`).value);
        };

        VAT.value = Number(document.querySelector("#vat-data").value);
    };

    modalSaveElement.addEventListener("click", () => {
        saveChanges();
        modalWrapperElement.style.display = "none";
        document.body.style.overflow = "visible";

        if (purchasePriceButtonElement.classList.contains("active")) {
            generatePurchasePriceEntries();

        } else generateSellingPriceEntries();
    });
};

generateModal();



// Show modal element //

const showModal = () => {
    const modalElement = document.querySelector(".main-modal-wrapper");
    const modalContainerElement = document.querySelector(".main-modal-container");
    
    modalElement.style.display = "flex";
    modalContainerElement.scrollTop = 0;
    document.body.style.overflow = "hidden";
};



// Export //

export { showModal };
