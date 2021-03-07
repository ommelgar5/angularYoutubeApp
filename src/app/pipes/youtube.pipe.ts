import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer){}

  transform(video: string ): SafeResourceUrl {

    let url = `https://www.youtube.com/embed/${ video }`;

    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
