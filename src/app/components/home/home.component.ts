import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/service/getdata.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies:any=[{}];
  englishmovies:any=[];
  hindimovies:any=[];
  f:any;
  constructor(private GetdataService:GetdataService,private router: Router){}

  ngOnInit(){
  this.GetdataService.getmoviedata().subscribe((response)=>{
    console.log(response,'in app1')
    this.movies=[];
    setTimeout(()=>{
      this.movies=response;
      console.log(this.movies,this.movies.length,'in home')
    },200)

  });
  }

  MouseEnter(event:any,movie:any)
  {
    console.log('MouseEnter',event.path[0]);
  }

  MouseLeave(event:any)
  {
    console.log('MouseLeave',event.path[0]);
  }

  buttonclick(movie:any)
  {
    console.log('button clicked',movie)
    this.router.navigate(['/bookticket'],{queryParams:{movieid:movie.id,moviename:movie.name}});
  }

}
