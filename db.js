import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

export default class db {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////                                 I   N   I   T   I   A   L                                      //////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    initDB() {
        let db;

        return new Promise((resolve) => {
            // To verify that both the Javascript and native part of this plugin are installed in your application
            console.log("Local DB plugin integrity check...");

            SQLite.echoTest()
                .then(() => {
                    console.log("Local DB plugin integrity check passed...");
                    console.log("Opening local database...");

                    SQLite.openDatabase({ name: 'test_mobile.db', createFromLocation: '~test_mobile.db' })
                        .then(DB => {
                            console.log("Database opened.");

                            db = DB;
                            resolve(db);
                        })
                        .catch(error => {
                            console.log("Opening database failed!")
                            this.errorCB(error);
                        });
                })
                .catch(error => {
                    console.log("Local DB plugin integrity check failed - plugin not functional");
                });
        });
    };


    closeDatabase(db) {
        if (db) {
            console.log("Closing local database...");

            db.close()
                .then(status => {
                    console.log("Database closed.");
                })
                .catch(error => {
                    console.log("Closing database failed!")
                    this.errorCB(error);
                });
        }
        else {
            console.log("Database was not opened.");
        }
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////                                      L A N G U A G E                                           //////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    saveLanguage(code) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE language set code=? where id=1', [code])
                        .then(([tx, results]) => {
                            console.log('ISO code saved!')

                            resolve(results);
                        });
                })
                    .catch((err) => {
                        console.log('Save ISO code error', err);
                    });
            })
                .catch((err) => {
                    console.log('Save ISO code error', err);
                });
        });
    }

    getLanguage() {
        return new Promise((resolve) => {
            const temp = [];

            this.initDB().then((db) => {
                db.transaction(tx => {
                    tx.executeSql('SELECT * FROM language ', [])
                        .then(([tx, results]) => {
                            console.log("Get language query completed.");

                            for (let i = 0; i < results.rows.length; ++i) {
                                temp.push(results.rows.item(i));
                            }

                            resolve(temp);
                        });
                })
                    .catch((err) => {
                        console.log('Get language error', err);
                    });
            })
                .catch((err) => {
                    console.log('Get language error', err);
                });
        });
    }


}

