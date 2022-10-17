import { Component } from '@angular/core';
import { GetdataService } from './service/getdata.service';
import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from "@angular/platform-browser";
// @Pipe({

//   name: 'safe'

// })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-ticket-booking-system';
  movies:any;
  f:any;

  keyword = "";
  send(keyword:any){
    console.log(keyword,'data emitted from form on submit caught in app...')
    this.keyword = keyword;
  }

  constructor(private GetdataService:GetdataService){}

  ngOnInit(){
  // this.GetdataService.getdata().subscribe((response)=>{
  //   console.log(response,'in app1')
  //   this.movies=response;
  // });
  }
}
