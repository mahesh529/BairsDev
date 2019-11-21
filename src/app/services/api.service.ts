import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

   }
   getPhotos() {
    return this.http.get(photosUrl);
  }

}
