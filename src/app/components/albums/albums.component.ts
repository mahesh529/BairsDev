import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums={};
  albumList=[]
  constructor(private apiService:ApiService) { }

  ngOnInit() {
   this.getPhotos();  
  }
  getPhotos(){
    this.apiService.getPhotos().subscribe(photos=>{
      let photosArr=  Array.isArray(photos)?photos:[];
      photosArr.sort(function(a, b) { 
          return b.albumId - a.albumId;
      });
      let counter=3;
      for(let i=0;i<photosArr.length;i++){
        if(!this.albums[photosArr[i]['albumId']]){
          if(counter==0)
            break;
          counter--;
          this.albums[photosArr[i]['albumId']]=[];
        }
        this.albums[photosArr[i]['albumId']].push(photosArr[i]);
      }

      let keys=Object.keys(this.albums),albumsList=[];
      for(let i=0;i<keys.length;i++){
        let photosArr= this.albums[keys[i]];
        photosArr.sort(function(a, b) { 
            return b.id - a.id;
        });
        albumsList.push(photosArr.slice(0,2))
      }
      this.albumList=albumsList.reverse();
      console.log(this.albumList)
    })
  }
}
