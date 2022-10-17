import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetdataService } from 'src/app/service/getdata.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css'],
})
export class BookticketComponent implements OnInit {

  seatmapping = ['00', '01', '02', '03', '04', '05', '06',
    '10', '11', '12', '13', '14', '15', '16',
    '20', '21', '22', '23', '24', '25', '26',
    '30', '31', '32', '33', '34', '35', '36',
    '40', '41', '42', '43', '44', '45', '46',
    '50', '51', '52', '53', '54', '55', '56',
  ]
  seats = [0, 1, 2, 3, 4, 5, 6];
  rows = [0, 1, 2, 3, 4, 5];

  showremainingseats=0;
  movieid:any;
  chosenmoviename: any;
  moviesdata:any=[{}];
  chosenmoviedata:any;
  totalseats = 42;
  bookedseats:any=[];
  bookedseat: any;
  unbookedseat: any;
  remainingseats=42;

  flag = 1;

  displayStyle = "block";

  name: string = 'ram';
  city: string = '';
  showtime: string = '';

  englishmovies:any=[];

  constructor(private route: ActivatedRoute,private router: Router,private toastr: ToastrService,private http: HttpClient,private GetdataService:GetdataService) {

  }

  ngOnInit(): void {

    console.log(this.route.snapshot.queryParams['moviename'], 'hello');
    this.chosenmoviename = this.route.snapshot.queryParams['moviename'];
    this.movieid=this.route.snapshot.queryParams['movieid'];;
    this.moviesdata=[]
    this.GetdataService.getmoviedata().subscribe((response)=>{
      this.moviesdata=response;
    
      for(let i=0;i<this.moviesdata.length;i++)
      {
        if(this.moviesdata[i].name===this.chosenmoviename)
        {
          console.log(11111111)  
          this.chosenmoviedata=this.moviesdata[i];
        }
      }
      console.log(this.chosenmoviedata);
    })

  }

  closePopup() {
    this.displayStyle = "none";
    this.showremainingseats=1;
  }

  onNameInput(event: any) { this.name = event.target.value; console.log(this.name, 'Name input'); }
  onCityInput(event: any) { this.city = event.target.value; console.log(this.city, 'city input'); }
  onshowtimeInput(event: any) { this.showtime = event.target.value; console.log(this.showtime, 'showtime input'); }

  assignselectedseats() {
  
    if (this.flag === 1) {
      
      let occupiedseatsnumber=0;
      if(this.showtime==='Morning'){
      occupiedseatsnumber = this.chosenmoviedata.morningbooked;
      }
      else if(this.showtime==='Evening'){
        occupiedseatsnumber = this.chosenmoviedata.eveningbooked;
      }
      else if(this.showtime==='Night'){
         occupiedseatsnumber = this.chosenmoviedata.nightbooked;
      }

      const shuffled = this.seatmapping.sort(() => 0.5 - Math.random());
      let occupiedseats = shuffled.slice(0, occupiedseatsnumber);
      console.log(occupiedseats);

      for (let i = 0; i < occupiedseatsnumber; i++) {

        let seat = document.getElementById(occupiedseats[i]);
        seat?.setAttribute('class', 'seat occupied');
      }

      // this.bookedseats=occupiedseatsnumber;
      this.remainingseats=this.totalseats-occupiedseatsnumber;
      this.flag = 0;

    }

  }

  buttonClicked(row: any, seat: any, event: any) {

    console.log(row,seat);

    if (event.path[0].classList.contains('selected')) {

      console.log('exists');
      event.path[0].setAttribute('class', 'seat');
      console.log(this.bookedseats);
      this.unbookedseat = { row: row, seat: seat };

      this.bookedseats = this.bookedseats.filter((obj: any) => {
        return obj.row !== this.unbookedseat.row || obj.seat !== this.unbookedseat.seat
      });

      this.remainingseats = this.remainingseats + 1;
      console.log(this.unbookedseat, this.bookedseats);

    }
    else if (event.path[0].classList.contains('occupied')) {
      this.toastr.error('Already Occupied');
      console.log('occupied');
    }
    else {
   
      event.path[0].setAttribute('class', 'seat selected');
      this.bookedseat = { row: row, seat: seat };
      console.log(this.bookedseat);
      this.bookedseats.push(this.bookedseat);
      console.log(this.bookedseats);
      this.remainingseats = this.remainingseats - 1;
    }


  }

  CheckOut()
  {
    let userdata={
      "moviename": this.chosenmoviename,
      "movieid":this.movieid,
      "name":this.name,
      "city":this.city,
      "showtime":this.showtime,
      "bookedseats":this.bookedseats,
      "bookedseatsnum":this.bookedseats.length
    };

    console.log(userdata);
    localStorage.setItem('userdata',JSON.stringify(userdata));

    let body:any;
    if(this.showtime==='Morning'){
      body={"morningbooked":this.chosenmoviedata.morningbooked+this.bookedseats.length};
      }
      else if(this.showtime==='Evening'){
        body={"eveningbooked":this.chosenmoviedata.eveningbooked+this.bookedseats.length};
      }
      else if(this.showtime==='Night'){
        body={"nightbooked":this.chosenmoviedata.nightbooked+this.bookedseats.length};
      }

    this.http.put<any>('https://633eb8de83f50e9ba3b6bb76.mockapi.io/movies-api/'+this.movieid, body)
    .subscribe(
      data => console.log('put success', data),
      error => console.log('put oops', error)
    );

    this.http.post('https://6348f1120b382d796c7a68cb.mockapi.io/users', userdata).subscribe(
      data => console.log('post success', data),
      error => console.log('post oops', error)
    );

    if(this.bookedseats.length>0){
    this.router.navigate(['/success']);
    }
  }

}
