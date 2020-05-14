import { Injectable } from '@angular/core';
import * as uuid from "uuid";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collection = `playlists`;

  constructor(public db: AngularFirestore) { }

  createPlaylist(name, songs) {
    return this.db.collection(this.collection).add({
      id: uuid(),
      name,
      songs
    });
  }

  getPlaylists() {
    return this.db.collection(this.collection).valueChanges();
  }

  deletePlaylists(id: string) {
    console.log(this.db.collection(this.collection).doc(id));

    return this.db.collection(this.collection).doc(id).delete();
  }
}
