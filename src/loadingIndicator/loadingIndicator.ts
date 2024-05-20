import { createHTMLElement } from "../utils/utils.js";
import "./index.css";

class LoadingIndicator {
    private container = createHTMLElement("div", { id: "loading-indicator" });
    private loadingIndicatorElement = createHTMLElement("div");

    constructor() {
        this.loadingIndicatorElement.textContent = "Loading!"
        this.container.appendChild(this.loadingIndicatorElement);

        this.loadEnd();
    }

    getContainer() { return this.container }


    loadStart() { this.container.style.display = "flex" }

    loadEnd() { this.container.style.display = "none" }
}

export const loadingIndicator = new LoadingIndicator();