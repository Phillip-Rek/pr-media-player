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


    constructor() {
        this.videoNavigationContainer.appendChild(this.currentTimeElement);
        this.videoNavigationElement.appendChild(this.elapsedTimeIndicator);
        this.videoNavigationContainer.appendChild(this.videoNavigationElement);
        this.videoNavigationContainer.appendChild(this.durationElement);

        this.currentTimeElement.textContent = "00:00";
        this.durationElement.textContent = "00:00";

        document.body.appendChild(this.previewTimeElement);
        document.body.appendChild(this.videoNavigationCanvas);
        document.body.appendChild(this.videoNavigationVideoElement);

        this.initMouseMoveEvent();
        this.initClickEvent();

        this.videoNavigationCanvas.width = 200;
        this.videoNavigationCanvas.height = 150;
    }

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


    initMouseMoveEvent() {
        this.videoNavigationElement.onmousemove = (e) => {
            if (Number.isNaN(videoScreen.getVideoElement().duration)) return;

            const { width, x } = this.videoNavigationElement.getBoundingClientRect();
            const cursorPosition = (e.clientX - x) / width;
            const duration = this.videoNavigationVideoElement.duration;

            this.previewTimeElement.style.display = "block";
            this.previewTimeElement.style.left = e.clientX + 10 + "px";
            this.previewTimeElement.style.top = e.clientY + 10 + "px";
            this.previewTimeElement.textContent = timeFromSecondsToMinutesSeconds(cursorPosition * duration)

            this.videoNavigationVideoElement.currentTime = cursorPosition * duration;

            const ctx = this.videoNavigationCanvas.getContext("2d");
            ctx?.drawImage(this.videoNavigationVideoElement, 0, 0, this.videoNavigationCanvas.width, this.videoNavigationCanvas.height);
            this.videoNavigationCanvas.style.display = "block";

            if (e.clientX >= (window.innerWidth - 200))
                this.videoNavigationCanvas.style.left = window.innerWidth - 200 - 10 + "px";
            else
                this.videoNavigationCanvas.style.left = e.clientX - 10 + "px";

            this.videoNavigationCanvas.style.top = e.clientY - this.videoNavigationCanvas.height - 10 + "px";
        }

        this.videoNavigationElement.onmouseleave = () => {
            this.previewTimeElement.style.display = "none";
            this.videoNavigationCanvas.style.display = "none";
        }

        this.videoNavigationElement.onmouseenter = this.videoNavigationElement.onmousemove
    }


    initClickEvent() {
        this.videoNavigationElement.onclick = (e) => {
            if (Number.isNaN(videoScreen.getVideoElement().duration)) return;

            const { width, x } = this.videoNavigationElement.getBoundingClientRect();
            const cursorPosition = (e.clientX - x) / width
            const vid = videoScreen.getVideoElement();
            const duration = vid.duration;
            vid.currentTime = cursorPosition * duration;
        }
    }


}

export const videoNavigation = new VideoNavigation();