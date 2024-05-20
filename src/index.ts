import { bottomTitleSection } from "./bottomTitleSection/bottomTitleSection.js";
import { controls } from "./controls/controls.js";
import { loadingIndicator } from "./loadingIndicator/loadingIndicator.js";
import { playList } from "./playlist/playlist.js";
import { createHTMLElement } from "./utils/utils.js";
import { videoNavigation } from "./videoNavigation/videoNavigation.js";
import { videoScreen } from "./videoScreen/videoScreen.js";
import "font-awesome/css/font-awesome.min.css";

const videoAndPlsylistContainer = createHTMLElement("div", {
    style: {
        display: "flex",
        flexDirection: "row",
        flex: "1",
        maxWidth: "100vw",
        width: "100%",
        height: "auto"
    }
});
videoAndPlsylistContainer.appendChild(videoScreen.getVideoContainer());
videoAndPlsylistContainer.appendChild(playList.getPlaylistElement());

// video player element
const style: Partial<CSSStyleDeclaration> = {
    backgroundColor: "#555f",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
}
const videoPlayerElement = <HTMLDivElement>createHTMLElement("div", { id: "video-player", style, });

videoPlayerElement.appendChild(videoAndPlsylistContainer);
videoPlayerElement.appendChild(videoNavigation.getContainer());
videoPlayerElement.appendChild(controls.getContainer());
videoPlayerElement.appendChild(bottomTitleSection.getContainer());
document.body.appendChild(videoPlayerElement);
document.body.appendChild(loadingIndicator.getContainer());

// keyboard events [shortcuts]
window.onkeyup = (e) => {
    console.log(e.code)
    switch (e.code) {
        case "Space": videoScreen.togglePause(controls.playButton); break;
        default: break;
    }
}