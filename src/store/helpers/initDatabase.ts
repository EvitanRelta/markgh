import Dexie, { Table } from 'dexie'
import { initDatabaseSchema } from './initDatabaseSchema'

class EditorDB extends Dexie {
    images!: Table<EditorImage, number>
    currentContent!: Table<EditorText, number>
    snapshots!: Table<Snapshot, number>
    constructor() {
        super('EditorDB')
        initDatabaseSchema(this)
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

export type EditorDBInstance = InstanceType<typeof EditorDB>

const database: EditorDBInstance = new EditorDB()

const resetDatabase = () => {
    console.error('Resetting database...')
    database.delete()
    window.location.reload()
}

database.on('ready', async () => {
    const tableNames = database.tables.map((table) => table.name)
    for (const tableName of tableNames) {
        const table = database.table(tableName)
        const records = await table.toArray()
        const primaryKey = table.schema.primKey.name
        const properties = table.schema.indexes.map((x) => x.name).concat(primaryKey)

        const isProperty = (key: string) => properties.includes(key)
        const hasAllProperties = (record: any) =>
            Object.keys(record).every(isProperty) &&
            Object.keys(record).length === properties.length

        for (const record of records) {
            if (!hasAllProperties(record)) return resetDatabase()
        }
    }
})

database.open().catch(resetDatabase)

export { database }
