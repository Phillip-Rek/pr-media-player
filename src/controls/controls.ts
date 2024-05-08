import { playList } from "../playlist/playlist.js";
import { createHTMLElement } from "../utils/utils.js";
import { videoNavigation } from "../videoNavigation/videoNavigation.js";
import { videoScreen } from "../videoScreen/videoScreen.js";

class Controls {
    controlsContainer = <HTMLDivElement>createHTMLElement("div", { id: "controls-container" });
    playButton = <HTMLButtonElement>createHTMLElement("button", { className: "fa fa-play" });
    prevButton = <HTMLButtonElement>createHTMLElement("button", { className: "fa fa-fast-backward" });
    stopButton = <HTMLButtonElement>createHTMLElement("button", { className: "fa fa-stop" });
    nextButton = <HTMLButtonElement>createHTMLElement("button", { className: "fa fa-fast-forward" });
    menuButton = <HTMLButtonElement>createHTMLElement("button", { className: "fa fa-list" });
    repeatButton = <HTMLButtonElement>createHTMLElement("button", { className: "fa fa-retweet" });
    volumeControl = <HTMLDivElement>createHTMLElement("span", { id: "volume-control" });

    toggleMuteButton = <HTMLDivElement>createHTMLElement("div", { className: "fa fa-volume-up", style: { color: "grey", position: "relative", left: "22px", padding: "0px", top: "5px", width: "20px" } });

    volumeElement = <HTMLElement>createHTMLElement("div", { style: { fontSize: "12px", position: "relative", color: "grey", backgroundColor: "transparent", height: "fit-content", zIndex: "30", left: "25px", top: "-5px" } });

    constructor() { }

    getContainer() { return this.controlsContainer }

    private activateToggleMuteButton() {
        this.controlsContainer.appendChild(this.toggleMuteButton);

        this.toggleMuteButton.onclick = () => {
            if (videoScreen.getVideoElement().muted) {
                videoScreen.getVideoElement().muted = false;
                this.toggleMuteButton.className = "fa fa-volume-up";
                this.toggleMuteButton.style.color = "grey";
            }
            else {
                videoScreen.getVideoElement().muted = true;
                this.toggleMuteButton.className = "fa fa-volume-off";
                this.toggleMuteButton.style.color = "#f22f";
            }
        }
    }

    private activatevolumeControl() {
        this.controlsContainer.appendChild(this.volumeControl);
        const volumeIndicator = createHTMLElement("div");
        this.volumeControl.appendChild(volumeIndicator);

        const displayVolumeElement = createHTMLElement("div", { style: { backgroundColor: "#000a", color: "#ffff", position: "absolute", display: "none", zIndex: "20" } });
        document.body.appendChild(displayVolumeElement);

        volumeIndicator.style.height = "100%";
        volumeIndicator.style.background = "linear-gradient(to right, #dfdf, #7f7f, #2a2f, #2a2f)";
        volumeIndicator.style.width = videoScreen.getVideoElement().volume * 100 + "%";

        this.volumeElement.textContent = "100%";
        this.volumeControl.onclick = (e) => {
            const volumeControlX = this.volumeControl.getBoundingClientRect().x;
            const volumeControlWidth = this.volumeControl.getBoundingClientRect().width;
            const cursorPositionInVolumeControl = (e.clientX - volumeControlX) / volumeControlWidth;

            videoScreen.getVideoElement().volume = cursorPositionInVolumeControl;

            this.volumeElement.textContent = Math.ceil(cursorPositionInVolumeControl * 100) + "%";

            volumeIndicator.style.width = Math.ceil(cursorPositionInVolumeControl * 100) + "%";
        }

        this.volumeControl.onmousemove = (e) => {
            displayVolumeElement.style.display = "block";
            displayVolumeElement.style.left = e.clientX + "px";
            displayVolumeElement.style.top = e.clientY - 20 + "px";
            const volumeControlX = this.volumeControl.getBoundingClientRect().x;
            const volumeControlWidth = this.volumeControl.getBoundingClientRect().width;
            const cursorPositionInVolumeControl = (e.clientX - volumeControlX) / volumeControlWidth;
            displayVolumeElement.textContent = Math.ceil(cursorPositionInVolumeControl * 100) + "%";
        }

        this.volumeControl.onmouseleave = () => {
            displayVolumeElement.style.display = "none";
        }
    }

    private activatePlayButton() {
        this.controlsContainer.appendChild(this.playButton);
        this.playButton.onclick = (e) => {
            videoScreen.togglePause(this.playButton);
        }
    }
}

export const controls = new Controls();