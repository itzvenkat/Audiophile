import { Component, OnInit, OnDestroy, Inject, TemplateRef, Input, ChangeDetectorRef } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  padding: number = 120;
  searchText: string = '';
  songsText: string = '';
  @Input() songs = [];
  so = new FormControl('', Validators.required);
  playlists = [];
  playlist: FormGroup;
  playlists$: Subscription;
  panelOpenState = false;
  modalRef: BsModalRef;
  songsModalRef: BsModalRef;
  playlistGroup: FormGroup;
  selectedSongsSet = new Set();
  openAddSongsIdx;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _snackBar: MatSnackBar,
    private firebaseService: FirebaseService,
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists() {
    this.playlists$ = this.firebaseService.getPlaylists().subscribe((data: any) => {
      data.forEach(element => {
        if (element?.songs) {
          try {
            element.songs = JSON.parse(element.songs);
          } catch (error) {
            console.log(error);
          }
        }
      });
      this.playlists = data;
    });
  }

  openCreatePlaylist(template: TemplateRef<any>) {
    this.playlistGroup = this.fb.group({
      id: null,
      title: ['', Validators.required],
      createdOn: null,
      so: '',
      songs: []
    });
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  createPlaylist() {
    if (this.playlistGroup.valid) {
      this.firebaseService.createPlaylist(this.playlistGroup.value).then(() => {
        this.modalRef.hide();
        this.playlistGroup = undefined;
        this._snackBar.open(`New Playlist added`, `NEW`, {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.changeDetectionRef.detectChanges();
      })
    }
  }

  deletePlaylist(id: string) {
    console.log(id);
    this.firebaseService.deletePlaylist(id);
    console.log(`Deleted Successfully`);
    this._snackBar.open(`Deleted Successfully`, `DELETE..`, {
      duration: 2000,
      verticalPosition: 'top'
    });
    this.changeDetectionRef.detectChanges();
  }

  openAddSongs(template: TemplateRef<any>, id) {
    this.openAddSongsIdx = id;
    this.selectedSongsSet.clear();
    this.songsModalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  selectedSongs(song, i, checked) {
    if (checked) {
      this.selectedSongsSet.add(song);
    } else {
      this.selectedSongsSet.delete(song);
    }
  }

  addSongs() {
    let selectedSongs = [...this.selectedSongsSet];
    let songs = this.playlists[this.openAddSongsIdx].songs;
    if (songs) {
      selectedSongs.forEach((data) => {
        songs.push(data);
      });
    } else {
      songs = selectedSongs;
    }
    let selectedSongsList = [...new Set(songs)];
    this.songsModalRef.hide();
    this.playlists[this.openAddSongsIdx].songs = selectedSongsList;
    let songsData = [...new Set(this.playlists[this.openAddSongsIdx].songs)];
    const data = JSON.parse(JSON.stringify(this.playlists[this.openAddSongsIdx]));
    data.songs = JSON.stringify(songsData);
    this.firebaseService.updatePlaylist(data).then(() => {
      this._snackBar.open(`New Songs added`, `NEW`, {
        duration: 2000,
        verticalPosition: 'top'
      });
    });
  }

  shufflePlay(songs) {
    if (songs && songs?.length > 0) {
      var randomnumber = this.randomIntFromInterval(0, songs.length - 1);
      let message = `Now Playing: ${songs[randomnumber]?.songName}`;
      this._snackBar.open(message, `Playing..`, {
        duration: 2000,
        verticalPosition: 'top'
      });
    } else {
      this._snackBar.open(`Unable to play`, `Error`, {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  deleteSong(song, i, s) {
    this.playlists[i].songs.splice(s, 1);
    const data = JSON.parse(JSON.stringify(this.playlists[i]));
    data.songs = JSON.stringify(data.songs);
    this.firebaseService.updatePlaylist(data).then(() => {
      this._snackBar.open(`Deleted song from playlist`, `DELETE`, {
        duration: 2000,
        verticalPosition: 'top'
      });
    });

  }

  trackBySongsFn(idx, data) {
    return data.id;
  }

  ngOnDestroy() {
    this.playlists$?.unsubscribe();
  }

}