export default function parseQuillHtml(html: string) {
    const convertedCenterAlign = html.replaceAll(/class="ql-align-([a-zA-Z]+)"/g, 'align="$1"')
    return convertedCenterAlign
}