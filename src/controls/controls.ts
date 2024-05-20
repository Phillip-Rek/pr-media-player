import { playList } from "../playlist/playlist.js";
import { createHTMLElement } from "../utils/utils.js";
import { videoNavigation } from "../videoNavigation/videoNavigation.js";
import { videoScreen } from "../videoScreen/videoScreen.js";
import "./index.css";

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

    constructor() {
        this.activatePlayButton();
        this.activatePrevButton();
        this.activateStopButton();
        this.activateNextButton();
        this.activateMenuButton();
        this.activateRepeatButton();
        this.activateToggleMuteButton();
        this.controlsContainer.appendChild(this.volumeElement);
        this.activatevolumeControl();
    }

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

    private activatePrevButton() {
        this.controlsContainer.appendChild(this.prevButton);

        this.prevButton.onclick = () => {
            playList.prev();
        }
    }

    private activateStopButton() {
        this.controlsContainer.appendChild(this.stopButton);

        this.stopButton.onclick = () => {
            videoNavigation.updateCurrentTime(0);
            playList.stop();
            this.playButton.className = "fa fa-play"
        }

    }

    private activateNextButton() {
        this.controlsContainer.appendChild(this.nextButton);

        this.nextButton.onclick = () => {
            playList.next();
        }
    }

    private activateRepeatButton() {
        this.controlsContainer.appendChild(this.repeatButton);

        this.repeatButton.onclick = () => {
            playList.repeatOne();
        }
    }

    private activateMenuButton() {
        this.controlsContainer.appendChild(this.menuButton);

        this.menuButton.onclick = () => {
            if (playList.getPlaylistElement().style.display !== "none") {
                playList.getPlaylistElement().style.display = "none";

                videoScreen.getVideoContainer().style.justifyContent = "center";
                videoScreen.getVideoContainer().style.flex = "1";
                videoScreen.getVideoContainer().style.width = "";

                videoScreen.getVideoElement().style.width = "100%";
                videoScreen.getVideoElement().style.height = "100%";

            }
            else {
                playList.getPlaylistElement().style.display = "flex";

                videoScreen.getVideoContainer().style.justifyContent = "flex-end";
                videoScreen.getVideoElement().style.height = "";
                videoScreen.getVideoContainer().style.width = "250px";
                videoScreen.getVideoContainer().style.flex = "";
            }
        }
    }

}

export const controls = new Controls();