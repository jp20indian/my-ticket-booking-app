import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalpage',
  templateUrl: './finalpage.component.html',
  styleUrls: ['./finalpage.component.css']
})
export class FinalpageComponent implements OnInit {

  constructor() { }

  name:any;
  moviename:any;
  bookedtickets:any;
  bookedticketsnumber:any;
  city:any;
  showtime:any;
  userdata:any;
  seatsbooked:any=[];

  ngOnInit(): void {
    this.userdata=localStorage.getItem('userdata');
    this.userdata=JSON.parse(this.userdata)
    console.log(this.userdata);
    for(let i=0;i<this.userdata.bookedseats.length;i++)
    {
      let seat=this.userdata.bookedseats[i].row+' '+this.userdata.bookedseats[i].seat;
      console.log('hello');
      this.seatsbooked.push(seat);
    }
    console.log(this.seatsbooked);
  }

}
