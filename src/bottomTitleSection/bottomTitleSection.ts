import { createHTMLElement } from "../utils/utils.js";

class BottomTitleSection {
    private bottomTitleContainer = createHTMLElement("div", { id: "bottom-title-section" })
    constructor() { }

    getContainer() { return this.bottomTitleContainer }

    updateTitle(title?: string) {
        this.bottomTitleContainer.textContent = title || "PR Media Player";
    }
}

export const bottomTitleSection = new BottomTitleSection(); 