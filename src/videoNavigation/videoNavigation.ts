import { createHTMLElement, timeFromSecondsToMinutesSeconds } from "../utils/utils.js";
import { videoScreen } from "../videoScreen/videoScreen.js";

class VideoNavigation {
    private videoNavigationContainer = createHTMLElement("div", { id: "video-navigation-container" })
    private videoNavigationElement = createHTMLElement("div", { id: "video-navigation-element" });
    private elapsedTimeIndicator = createHTMLElement("div", { id: "elapsed-time-indocator" });
    private currentTimeElement = createHTMLElement("div", { className: "time" });
    private durationElement = createHTMLElement("div", { className: "time" });

    private videoNavigationVideoElement = <HTMLVideoElement>createHTMLElement("video", { style: { display: "none", position: "absolute", height: "100px", width: "100px" } })

    private previewTimeElement = createHTMLElement("span", { id: "preview-time" });
    private videoNavigationCanvas = <HTMLCanvasElement>createHTMLElement("canvas", { id: "preview-video-canvas" });

}

export const videoNavigation = new VideoNavigation();