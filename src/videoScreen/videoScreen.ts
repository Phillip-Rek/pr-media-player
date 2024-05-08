import { bottomTitleSection } from "../bottomTitleSection/bottomTitleSection.js";
import { playList, Track } from "../playlist/playlist.js";
import { createHTMLElement } from "../utils/utils.js";
import { videoNavigation } from "../videoNavigation/videoNavigation.js";

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

    togglePause(playButton: HTMLElement) {
        bottomTitleSection.updateTitle(playList.currentPlayingSong?.title);
        if (this.videoElement.paused) {
            this.videoElement.play()
                .then(res => {
                    playButton.className = "fa fa-pause";
                })
                .catch(err => {
                    playButton.className = "fa fa-play";
                })
        }
        else {
            videoScreen.videoElement.pause();
            playButton.className = "fa fa-play";
        }

        videoNavigation.setDuration(this.videoElement.duration);
    }
}

export const videoScreen = new VideoScreen();