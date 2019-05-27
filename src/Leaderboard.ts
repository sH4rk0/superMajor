import * as firebase from 'firebase'

export default class Leaderboard {
  private firebaseConfig = {
    apiKey: '****',
    authDomain: '****',
    databaseURL: '****',
    projectId: '****',
    storageBucket: '****',
    messagingSenderId: '****',
    appId: '****'
  }
  private fireBaseApp: firebase.app.App
  private fireBaseDb: firebase.database.Database
  private scores: firebase.database.Reference

  constructor() {
    this.fireBaseApp = firebase.initializeApp(this.firebaseConfig)
    this.fireBaseDb = this.fireBaseApp.database()
    this.scores = this.fireBaseDb.ref('scores')
  }

  insertScore(score: ScoreConfig) {
    this.scores.push(score)
  }
}
