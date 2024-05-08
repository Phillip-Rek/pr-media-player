import { bottomTitleSection } from "../bottomTitleSection/bottomTitleSection.js";
import { Track } from "../playlist/playlist.js";
import { createHTMLElement } from "../utils/utils.js";

class VideoScreen {
    private videoElement = <HTMLVideoElement>createHTMLElement("video", { id: "video", attributes: { autoplay: "true" } });
    private videoContainer = createHTMLElement("div", { id: "video-container" });

    constructor() {
    }

    getVideoContainer() { return this.videoContainer }
    getVideoElement() { return this.videoElement; }


    play(song: Track) {
        this.videoElement.src = song.url;
        bottomTitleSection.updateTitle(song.title);
    }
}

export const videoScreen = new VideoScreen();