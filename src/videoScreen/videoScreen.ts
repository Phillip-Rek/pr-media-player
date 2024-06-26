import { bottomTitleSection } from "../bottomTitleSection/bottomTitleSection.js";
import { controls } from "../controls/controls.js";
import { loadingIndicator } from "../loadingIndicator/loadingIndicator.js";
import { playList, Track } from "../playlist/playlist.js";
import { createHTMLElement } from "../utils/utils.js";
import { videoNavigation } from "../videoNavigation/videoNavigation.js";
import "./index.css";

class VideoScreen {
    private videoElement = <HTMLVideoElement>createHTMLElement("video", { id: "video", attributes: { autoplay: "true" } });
    private videoContainer = createHTMLElement("div", { id: "video-container" });

    constructor() {
        this.videoContainer.appendChild(this.videoElement);
        this.initializeDropEvents();

        this.videoElement.onloadedmetadata = () => {
            videoNavigation.setDuration(this.videoElement.duration);
        }

        this.videoElement.ontimeupdate = () => {
            videoNavigation.updateCurrentTime(this.videoElement.currentTime);
        }

        this.videoElement.onended = () => {
            controls.playButton.className = "fa fa-play";
            playList.next();
        }

        this.videoElement.onplay = () => {
            controls.playButton.className = "fa fa-pause";

            document.title = playList.currentPlayingSong?.title + " - PR Media Player";

            videoNavigation.attachVideoNavigationToVideo(this.videoElement.src);
        }

        this.videoElement.onpause = () => {
            controls.playButton.className = "fa fa-play";
        }
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
            if (!this.videoElement.src && playList.currentPlayingSong)
                this.play(playList.currentPlayingSong);

            this.videoElement.play().then(() => { playButton.className = "fa fa-pause" })
        }
        else {
            videoScreen.videoElement.pause();
            playButton.className = "fa fa-play";
        }
    }

    private initializeDropEvents() {

        this.videoContainer.addEventListener("dragenter", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        this.videoContainer.addEventListener("dragleave", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        this.videoContainer.addEventListener("dragover", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        this.videoContainer.addEventListener("drop", (dropEvent) => {
            dropEvent.preventDefault();
            dropEvent.stopPropagation();

            if (dropEvent.dataTransfer) {
                for (const file of dropEvent.dataTransfer?.files) {
                    const fileReader = new FileReader();
                    const title = file.name;

                    fileReader.onloadend = (e) => {
                        const url = URL.createObjectURL(new Blob([<ArrayBuffer>fileReader.result]));
                        this.videoElement.src = url;
                        bottomTitleSection.updateTitle(title);

                        playList.play(playList.add({ title, url }));
                        // videoNavigation.setDuration(this.videoElement.duration);

                        loadingIndicator.loadEnd();
                    }

                    fileReader.onloadstart = (e) => {
                        loadingIndicator.loadStart()
                    }

                    fileReader.readAsArrayBuffer(file);
                }
            }
        });

    }
}

export const videoScreen = new VideoScreen();