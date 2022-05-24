export default (element: HTMLElement, allowedAttributes: string[]) => {
    const copy = element.cloneNode(false) as HTMLElement
    Array.from(copy.attributes)
        .filter(attribute => allowedAttributes.includes(attribute.name))
        .map(attribute => attribute.name)
        .forEach(x => {
            console.log(x)
            copy.removeAttribute(x)
        })
    return copy
}