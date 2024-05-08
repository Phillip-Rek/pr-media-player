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


    getContainer() { return this.videoNavigationContainer }

    attachVideoNavigationToVideo(url: string) {
        this.videoNavigationVideoElement.muted = true;
        this.videoNavigationVideoElement.src = url;
        this.videoNavigationVideoElement.play();
    }

    setDuration(seconds: number) {
        this.durationElement.textContent = timeFromSecondsToMinutesSeconds(seconds);
    }

    updateCurrentTime(seconds: number) {
        this.currentTimeElement.textContent = timeFromSecondsToMinutesSeconds(seconds);

        const elapsedTimePercentage = (seconds / videoScreen.getVideoElement().duration) * 100 + "%";

        this.elapsedTimeIndicator.style.width = elapsedTimePercentage;
    }
}

export const videoNavigation = new VideoNavigation();