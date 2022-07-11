import Dexie, { Table } from 'dexie'

class EditorDB extends Dexie {
    images!: Table<EditorImage, number>
    text!: Table<EditorText, number>
    snapshots!: Table<Snapshot, number>
    constructor() {
        super('EditorDB')
        this.version(2).stores({
            images: 'id,base64',
            text: 'id,value',
            snapshots: 'id,savedOn,title,value',
        })
    }
}

export interface EditorImage {
    id: number
    base64: string
}
export interface EditorText {
    id: number
    value: string
}

export interface Snapshot {
    id: number
    savedOn: string
    title: string
    value: string
}

export type EditorDBInstance = InstanceType<typeof EditorDB>

const database: EditorDBInstance = new EditorDB()

export { database }
