import Dexie, { Table } from 'dexie'

export class EditorDB extends Dexie {
    images!: Table<EditorImage>
    text!: Table<EditorText, number>
    snapshots!: Table<Snapshot, number>
    constructor() {
        super('EditorDB')
        this.version(1).stores({
            images: 'id',
            text: 'id',
            snapshots: 'id',
        })
    }
}

export interface EditorImage {
    id?: number
    base64: string
}
export interface EditorText {
    id?: number
    value: string
}

export interface Snapshot {
    id?: number
    savedOn: string
    title: string
    value: string
}
