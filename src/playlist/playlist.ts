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

    prev(): void {
        if (!this.currentPlayingSong) return;
        let i = this.currentPlayingSong.trackNumber;
        if (this.isRepeated) {
            this.play(this.playList[i]);
        }
        else if (this.isFirst(i)) {
            this.play(this.playList[this.playList.length - 1])
        }
        else {
            this.play(this.playList[i - 1]);
        }
        // console.log(this.playList[i - 1].url)
        videoScreen.getVideoElement().src = this.playList[i - 1].url;
    }

    next(): void {
        if (!this.currentPlayingSong) return;

        let i = this.currentPlayingSong.trackNumber;
        if (this.isRepeated) {
            this.play(this.playList[i]);
        }
        else if (this.isLast(i)) {
            this.play(this.playList[0]);
        }
        else
            this.play(this.playList[i + 1]);
    }

    isFirst = (i: number) => i === 0 ? true : false;
    isLast = (i: number) => i === this.playList.length - 1 ? true : false;

}

export const playList = new PlayList();