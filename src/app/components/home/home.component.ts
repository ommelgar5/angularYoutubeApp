import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSeleccionado: any;

  @ViewChild('modal') modalElement: ElementRef;

  constructor( private yts: YoutubeService) {
    this.yts.getVideos().subscribe( videos => this.videos = videos );
  }

  ngOnInit(): void {
  }


  verVideo(video: any){
    this.videoSeleccionado = video;
  }

  cerrarModal(){
    this.videoSeleccionado = null;
    let modal: HTMLElement = this.modalElement.nativeElement as HTMLElement;
    let video = modal.querySelector('iframe');
    video.src = '';

  }

  verMasVideos(){
    // Unir dos areglos, para mantener los videos existes
    // this.yts.getVideos().subscribe( videos => this.videos.push.apply(this.videos, videos));
    // this.yts.getVideos().subscribe( videos => this.videos = [...this.videos, ...videos]);
    this.yts.getVideos().subscribe( videos => this.videos.push(...videos));

  }
}
