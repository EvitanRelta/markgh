import { Version } from 'dexie'
import { EditorDBInstance } from './initDatabase'

type UpgradeFunc = Parameters<Version['upgrade']>[0]

// Renames IndexDB table.
const renameTable =
    (oldTableName: string, newTableName: string): UpgradeFunc =>
    async (trans) => {
        const records = await trans.table(oldTableName).toArray()
        await trans.table(newTableName).bulkAdd(records)
    }

export const initDatabaseSchema = (db: EditorDBInstance) => {
    db.version(1).stores({
        images: '++id,base64',
        text: '++id,value',
        snapshots: '++id,savedOn,title,value',
    })
    db.version(2)
        .stores({
            text: null,
            currentContent: '++id,value',
        })
        .upgrade(renameTable('text', 'currentContent'))
}
