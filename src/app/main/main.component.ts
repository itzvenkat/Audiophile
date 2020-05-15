import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MusicService } from '../services/music.service';
import { Albums, Photos, Music } from './main.model';
import { Subscription, forkJoin } from 'rxjs';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: { style: 'width:100%; height:100%; display:flex; justify-content:center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
  songs: Music[] = [];
  albums: Albums[];
  photos: Photos[];
  searchText: string = "";
  padding: number = 120;

  albums$: Subscription;
  photos$: Subscription;
  store$: Subscription;

  constructor(
    private storeService: StoreService,
    private musicService: MusicService,
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setValues();
    this.store$ = this.storeService._isMobileView.subscribe((_isMobileView: boolean) => {
      this.padding = (_isMobileView) ? 150 : 120;
    });
  }

  setValues() {
    this.albums$ = this.musicService.getAlbums().subscribe((data) => {
      this.albums = data;
    }, (error) => {
      console.error(error);
    }, () => {
      this.photos$ = this.musicService.getPhotos().subscribe((data) => {
        this.photos = data;
        this.setSongsInfo(this.albums, this.photos);
      }, (error) => {
        console.error(error);
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
    this.changeDetectionRef.detectChanges();
    console.log(this.songs);
  }

  trackBySongsFn(idx, data) {
    return data.id;
  }

  ngOnDestroy() {
    this.albums$?.unsubscribe();
    this.photos$?.unsubscribe();
    this.store$?.unsubscribe();
    this.changeDetectionRef?.detach();
  }

}
