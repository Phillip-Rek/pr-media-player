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