import { sh } from './initShellJs'

export const logMsg = (msg: string) => {
    sh.echo('-e', msg)
}

export const exitWithErrorMsg = (msg: string): never => {
    const paddedMsg = msg.replaceAll(/(?<=\n)/g, ' '.repeat('Error: '.length))
    sh.echo('-e', `Error: ${paddedMsg}`)
    sh.exit(1)
}

export const getCommandOutput = (command: string) => {
    return sh.exec(command).stdout.trim()
}
