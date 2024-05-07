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

}

export const controls = new Controls();