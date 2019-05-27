import * as firebase from 'firebase'

export default class Leaderboard {
  private firebaseConfig = {
    apiKey: 'AIzaSyAdRVmgt6jh-CJ4nmZQh8KwNp_ABivgdmo',
    authDomain: 'supermajor2k19.firebaseapp.com',
    databaseURL: 'https://supermajor2k19.firebaseio.com',
    projectId: 'supermajor2k19',
    storageBucket: 'supermajor2k19.appspot.com',
    messagingSenderId: '789535657299',
    appId: '1:789535657299:web:ce6ba1fd68a249b1'
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
