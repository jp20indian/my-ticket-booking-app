import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetdataService } from 'src/app/service/getdata.service';
import { EditbookedseatsdataService } from 'src/app/service/editbookedseatsdata.service';

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'moviename',
    type: 'text',
    label: 'Movie Name',
  },
  {
    key: 'movieid',
    type: 'text',
    label: 'Movie Id',
  },
  {
    key: 'city',
    type: 'text',
    label: 'City',
  },
  {
    key: 'showtime',
    type: 'text',
    label: 'Show Time',
  },
  {
    key: 'bookedseatsnum',
    type: 'number',
    label: 'Number of Seats Booked',
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  oldbookedseats:any;
  newbookedseats:any;
  changeinbookedseats:any;

  constructor(private GetdataService:GetdataService,private http:HttpClient,private editbookedseats:EditbookedseatsdataService) { }

  dataSource:any=[];

  ngOnInit(): void {
    this.GetdataService.getuserdata().subscribe((response:any)=>
    {
      console.log(response);
      this.dataSource=response;
    });
  }

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;

  EditingStarted(element:any)
  {
    console.log(element);
    this.oldbookedseats=element.bookedseatsnum;
  }

  EditingDone(element:any)
  {
    console.log(element);
    let editeduser={
      "name":element.name,
      "moviename":element.moviename,
      "city":element.city,
      "showtime":element.showtime,
      "bookedseatsnum":element.bookedseatsnum
    };

    this.http.put<any>('https://6348f1120b382d796c7a68cb.mockapi.io/users/'+element.id, editeduser)
    .subscribe(
      data => console.log('put success', data),
      error => console.log('put oops', error)
    );

    this.newbookedseats=element.bookedseatsnum;

    this.changeinbookedseats=this.newbookedseats-this.oldbookedseats;

    console.log(this.changeinbookedseats,'change in booked seats');

    this.editbookedseats.editbookedseatsdata(this.changeinbookedseats,element.movieid,element.showtime);

  }


}
