import { Injectable } from '@angular/core';
import { APP } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Albums, Photos } from '../main/main.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private baseURL = APP.baseURL;
  constructor(private http: HttpClient) { }

  public getAlbums(): Observable<Albums[]> {
    return this.http.get<Albums[]>(this.baseURL + "albums");
  }

  public getPhotos(): Observable<Photos[]> {
    return this.http.get<Photos[]>(this.baseURL + "photos");
  }

  // GET
  // public session(): Observable<any> {
  //   return this.http.get(this._baseURLPMS + "session");
  // }
  //POST
  // signin(username: string, password: string): Observable<any> {
  //   return this.http.post(`${this.baseURL}/auth/signin`, { username, password }, { observe: "response" });
  // }
}
