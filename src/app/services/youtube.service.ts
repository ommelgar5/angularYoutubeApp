import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  youtubeApiUrl = 'https://www.googleapis.com/youtube/v3';
  apiKey = 'AIzaSyB-cn1zeHM_Pt3MEEiOj2v10J_kSzchxEc';
  playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  nextPageToken: string = '';

  constructor( private http: HttpClient ) {}


  getVideos() {
    let url = `${this.youtubeApiUrl }/playlistItems`;
    let parametros = new HttpParams()
                          .set('part', 'snippet')
                          .set('maxResults','10')
                          .set('playlistId', this.playlist )
                          .set('key', this.apiKey );
    /*
      Si se le pas el token, la API de google ya sabe que pagina traer con su contenido
    */
    if(this.nextPageToken){
        parametros = parametros.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, { params: parametros })
            .pipe( map( ((resultado: any) => {
              this.nextPageToken = resultado['nextPageToken'];
              return resultado.items.map( item => item.snippet );
            })));
  }

}

