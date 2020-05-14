import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  padding: number = 120;
  searchText: string = '';
  songs = [];
  playlists = [];
  playlist: FormGroup;
  playlists$: Subscription;
  panelOpenState = false;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists() {
    this.playlists$ = this.firebaseService.getPlaylists().subscribe((data: any) => {
      console.log(data);
      data.forEach(element => {
        if (element?.songs) {
          element.songs = JSON.parse(element.songs);
        }
      });
      this.playlists = data;
    });
  }

  createPlaylist() {
    // this.firebaseService.createPlaylist().then()
  }

  deletePlaylist(id: string) {
    console.log(id);
    this.firebaseService.deletePlaylists(id);
    console.log(`Deleted Successfully`);
    this.getPlaylists();
  }

  trackBySongsFn(idx, data) {
    return data.id;
  }

  ngOnDestroy() {
    this.playlists$?.unsubscribe();
  }

}
