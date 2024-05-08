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

    add(song: { title: string, url: string, }): Track {
        let trackNum = this.playList.length;
        let track: Track = {
            title: song.title,
            url: song.url,
            trackNumber: trackNum
        }
        this.playList.push(track);

        // this.currentPlayingSong = track;

        //modifying the DOM
        this.addPlaylistItemToDOM(track);

        return track;
    }

    addPlaylistItemToDOM(track: Track, background?: string) {
        const trackElement = createHTMLElement("div", { className: "playlist-item", id: track.title });
        const trackTitleElement = createHTMLElement("span", { className: "track-title" });
        trackTitleElement.textContent = (this.playList.length) + ". " + track.title;

        const textCutIndicator = createHTMLElement("span", { style: { width: "30px", height: "100%", background: "linear-gradient(to right, rgba(68, 68, 68, 0.2), rgba(68, 68, 68, 0.8))", position: "relative", left: "-30px" } })

        const trackDeleteBtn = createHTMLElement("span", { className: "playlist-delete-item" });
        trackDeleteBtn.textContent = "x";
        trackElement.appendChild(trackTitleElement);
        trackElement.appendChild(textCutIndicator);
        trackElement.appendChild(trackDeleteBtn);

        if (background) trackElement.style.backgroundColor = background;

        this.playlistElement.appendChild(trackElement);

        trackElement.ondblclick = () => { this.play(track); }
        trackDeleteBtn.onclick = () => {
            for (let i = 0; i < this.playList.length; i++) {
                const trackInPlaylist = this.playList[i];
                if (trackInPlaylist === track) { this.playList.splice(i, 1); }
            }
            trackElement.remove();
            this.updateTrackNumberInTheDOM();
        }
    }

    private updateTrackNumberInTheDOM() {
        for (let i = 0; i < this.playlistElement.children.length; i++) {
            const playlistItem = this.playlistElement.children[i];
            (<HTMLElement>playlistItem.children.item(0)).textContent = `${i + 1}. ${this.playList[i].title}`
        }
    }

    remove(song: Track): void {
        this.playList.forEach((_song, i) => {
            if (song.url === _song.url) {
                this.playList.splice(i, 1);
            }

            this.playList.forEach((song, i) => {
                song.trackNumber = i;
            })
        })
    }
}

export const playList = new PlayList();