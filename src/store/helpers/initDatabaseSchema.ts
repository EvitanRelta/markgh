import { Version } from 'dexie'
import { getFormatedNow } from './getFormatedNow'
import { EditorDBInstance } from './initDatabase'

type UpgradeFunc = Parameters<Version['upgrade']>[0]

// Renames IndexDB table.
const renameTable =
    (oldTableName: string, newTableName: string): UpgradeFunc =>
    async (trans) => {
        const records = await trans.table(oldTableName).toArray()
        await trans.table(newTableName).bulkAdd(records)
    }

// Renames a field in a table.
const renameField =
    (tableName: string, oldFieldName: string, newFieldName: string): UpgradeFunc =>
    async (trans) => {
        await trans
            .table(tableName)
            .toCollection()
            .modify((table) => {
                table[newFieldName] = table[oldFieldName]
                delete table[oldFieldName]
            })
    }

// Adds a new field, with the value obtained via 'getValue'.
const addField =
    (tableName: string, fieldName: string, getValue: (table: any) => any): UpgradeFunc =>
    async (trans) => {
        await trans
            .table(tableName)
            .toCollection()
            .modify((table) => {
                table[fieldName] = getValue(table)
            })
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
    db.version(3)
        .stores({
            currentContent: '++id,content',
            snapshots: '++id,lastEditedOn,fileTitle,content',
        })
        .upgrade(renameField('currentContent', 'value', 'content'))
        .upgrade(renameField('snapshots', 'value', 'content'))
        .upgrade(renameField('snapshots', 'savedOn', 'lastEditedOn'))
        .upgrade(renameField('snapshots', 'title', 'fileTitle'))
    db.version(4)
        .stores({
            currentContent: '++id,lastEditedOn,fileTitle,content',
        })
        .upgrade(addField('currentContent', 'lastEditedOn', getFormatedNow))
        .upgrade(addField('currentContent', 'fileTitle', () => ''))
}
