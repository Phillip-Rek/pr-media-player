export function createHTMLElement(name: string, props: {
    style?: Partial<CSSStyleDeclaration>,
    id?: string,
    className?: string,
    attributes?: Partial<{}>
} = {}) {
    const element = document.createElement(name);

    element.id = props.id ? props.id : element.id;
    element.className = props.className ? props.className : element.className;

    if (props.style) {
        for (const cssProperty of Object.entries(props.style) as Array<[string, string]>) {
            //@ts-ignore
            element.style[cssProperty[0]] = cssProperty[1]
        }
    }

    if (props.attributes) {
        for (const cssProperty of Object.entries(props.attributes) as Array<[string, string]>) {
            //@ts-ignore
            element[cssProperty[0]] = cssProperty[1]
        }
    }

    return element;
}


export function timeFromSecondsToMinutesSeconds(time: number): string {
    if (Number.isNaN(time)) return "";

    let sec = "";
    let mins = "";
    let hrs = "";

    if (time <= 60) {
        mins = `00`;
        if (time < 10)
            sec = `0${Math.floor(time)}`;
        else
            sec = `${Math.floor(time)}`;

        return mins + ":" + sec;
    }
    else if (time <= 60 * 60) {
        time /= 60;
        if (Math.floor(time) < 10)
            mins = `0${Math.floor(time)}`;
        else
            mins = `${Math.floor(time)}`;

        if ((time - Math.floor(time)) * 60 < 10)
            sec = `0${Math.floor((time - Math.floor(time)) * 60)}`;
        else
            sec = `${Math.floor((time - Math.floor(time)) * 60)}`;

        return mins + ":" + sec;
    }
    else {
        hrs = `${Math.floor(time / (60 * 60))}`;
        return hrs + ":" + timeFromSecondsToMinutesSeconds((time / (60 * 60) - Math.floor(time / (60 * 60))) * 60 * 60);
    }
}
