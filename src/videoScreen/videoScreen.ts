import { createHTMLElement } from "../utils/utils.js";

class VideoScreen {
    private videoElement = <HTMLVideoElement>createHTMLElement("video", { id: "video", attributes: { autoplay: "true" } });
    private videoContainer = createHTMLElement("div", { id: "video-container" });

    constructor() {
    }
}

export const videoScreen = new VideoScreen();