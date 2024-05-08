import { createHTMLElement } from "../utils/utils.js";
import { videoScreen } from "../videoScreen/videoScreen.js";

export declare type Track = {
    title: string,
    url: string,
    trackNumber: number
}

class PlayList {
    playlistElement: HTMLElement = createHTMLElement("div", { id: "playlist-element" });
    isRepeated: boolean = false;
    currentPlayingSong?: Track = undefined;
    playList: Array<Track> = [];


    getPlaylistElement() { return this.playlistElement }

    play(song: Track) {
        this.currentPlayingSong = song;
        videoScreen.play(song);

        for (let i = 0; i < this.playList.length; i++) {
            const track = this.playList[i];
            if (track === this.currentPlayingSong) {
                (<HTMLElement>this.playlistElement.children.item(i)).className = "playlist-item selected";
            }
            else {
                (<HTMLElement>this.playlistElement.children.item(i)).className = "playlist-item";
            }
        }
    }

    stop() {
        this.currentPlayingSong = undefined;
        videoScreen.getVideoElement().src = "";
    }

}

export const playList = new PlayList();