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


}

export const playList = new PlayList();