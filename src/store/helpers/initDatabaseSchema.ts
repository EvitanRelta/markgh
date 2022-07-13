import { EditorDBInstance } from './initDatabase'

export const initDatabaseSchema = (db: EditorDBInstance) => {
    db.version(1).stores({
        images: '++id,base64',
        text: '++id,value',
        snapshots: '++id,savedOn,title,value',
    })
}
