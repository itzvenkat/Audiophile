import { Injectable } from '@angular/core';
import * as uuid from "uuid";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collection = `playlists`;

  constructor(public db: AngularFirestore) { }

  createPlaylist(form) {
    let id = uuid.v4();
    return this.db.collection(this.collection).doc(id).set({
      id,
      title: form.title,
      songs: form.songs,
      createdOn: new Date().toString()
    });
  }

  getPlaylists() {
    return this.db.collection(this.collection).valueChanges();
  }

  updatePlaylist(data) {
    return this.db.collection(this.collection).doc(data.id).set(data, { merge: true });
  }

  deletePlaylist(id) {
    return this.db.collection(this.collection).doc(id).delete();
  }
}