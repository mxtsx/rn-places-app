import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('places.db')

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUrl TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)',
                    [],
                    resolve,
                    (_, err) => reject(err))
            })
        })
    }

    static insertPlace(title, imageUrl, address, lat, lng) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO places (title, imageUrl, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
                    [title, imageUrl, address, lat, lng],
                    (_, res) => resolve(res),
                    (_, err) => reject(err))
            })
        })
    }

    static fetchPlaces() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM places',
                    [],
                    (_, res) => resolve(res),
                    (_, err) => reject(err))
            })
        })
    }

    static removePlace(id) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM places WHERE id = ?',
                    [id],
                    (_, res) => resolve(res),
                    (_, err) => reject(err))
            })
        })
    }
}