import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MusicService } from '../services/music.service';
import { Albums, Photos, Music } from './main.model';
import { Subscription, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: { style: 'width:100%; height:100%; display:flex; justify-content:center' },
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
  songs: Music[] = [];
  search: string = "";
  albums: Albums[];
  albums$: Subscription;
  photos: Photos[];
  photos$: Subscription;
  searchText: string = "";

  constructor(private musicService: MusicService, private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setValues();
  }

  setValues() {
    this.albums$ = this.musicService.getAlbums().subscribe((data) => {
      this.albums = data;
    }, (error) => {

    }, () => {
      this.photos$ = this.musicService.getPhotos().subscribe((data) => {
        this.photos = data;
        this.setSongsInfo(this.albums, this.photos);
      }, (error) => {

      }, () => {

      });
    });
  }

  setSongsInfo(albums: Albums[], photos: Photos[]) {
    this.photos = photos;
    this.albums = albums;
    this.songs = [];
    let merged = [];
    const albumMap = new Map();
    albums.forEach((album) => {
      albumMap.set(`${album.id}`, { id: album.id, albumTitle: album.title, userId: album.userId })
    });
    photos.forEach((data, i) => {
      if (albumMap.has(`${data.albumId}`)) {
        let albumDetails = albumMap.get(`${data.albumId}`);
        let music: any = data;
        music.albumName = albumDetails.albumTitle;
        music.songName = data.title;
        delete music.title;
        merged.push({ ...music });
      }
    });
    this.songs = merged;
    console.log(this.songs);
  }

  trackBySongsFn(idx, data) {
    return data.id;
  }

  ngOnDestroy() {
    this.albums$?.unsubscribe();
    this.photos$?.unsubscribe();
  }

}
