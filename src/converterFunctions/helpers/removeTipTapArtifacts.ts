import { tipTapArtifactClassNames } from './tipTapArtifactClassNames'

export const removeTipTapArtifacts = (htmlElement: Element) => {
    const selector = tipTapArtifactClassNames.map((className) => '.' + className).join(',')

    htmlElement.querySelectorAll(selector).forEach((element) => {
        const parentElement = element.parentElement
        if (!parentElement) throw new Error('Error parsing codeblock.')

        parentElement.removeChild(element)
    })
}
