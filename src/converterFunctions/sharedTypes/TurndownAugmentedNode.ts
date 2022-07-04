export interface TurndownAugmentedNode extends HTMLElement {
    flankingWhitespace: {
        leading: string
        trailing: string
    }
    isBlank: boolean
    isBlock: boolean
}
