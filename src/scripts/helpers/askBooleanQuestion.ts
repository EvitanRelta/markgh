import readlineSync from 'readline-sync'

export const askBooleanQuestion = (question: string) => {
    let answer = ''

    const isYes = (answer: string) => ['y', 'yes'].includes(answer)
    const isNo = (answer: string) => ['n', 'no'].includes(answer)
    const isValidAnswer = (answer: string) => isYes(answer) || isNo(answer)

    while (!isValidAnswer(answer)) {
        answer = readlineSync.question(question).trim().toLowerCase()
    }

    if (isYes(answer)) return true
    return false
}
