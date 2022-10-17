import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditbookedseatsdataService {

  constructor(private http: HttpClient) { }

  editbookedseatsdata(changeinbookedseats:any,movieid:any,showtime:any)
  {
    console.log(changeinbookedseats,movieid,showtime);

    this.http.get('https://633eb8de83f50e9ba3b6bb76.mockapi.io/movies-api/'+movieid).subscribe((response:any)=>{
      console.log(response.nightbooked);
      let moviedata=response;
      
      if(showtime==='Morning')
      {
        let newbookedseats=moviedata.morningbooked+changeinbookedseats;
        let body={"morningbooked":newbookedseats};

        this.http.put<any>('https://633eb8de83f50e9ba3b6bb76.mockapi.io/movies-api/'+movieid, body)
        .subscribe(
          data => console.log('put success', data),
          error => console.log('put oops', error)
        );
      }
      else if(showtime==='Night')
      {
        let newbookedseats=moviedata.nightbooked+changeinbookedseats;
        let body={"nightbooked":newbookedseats};

        this.http.put<any>('https://633eb8de83f50e9ba3b6bb76.mockapi.io/movies-api/'+movieid, body)
        .subscribe(
          data => console.log('put success', data),
          error => console.log('put oops', error)
        );
      }
      else if(showtime==='Evening')
      {
        let newbookedseats=moviedata.eveningbooked+changeinbookedseats;
        let body={"eveningbooked":newbookedseats};

        this.http.put<any>('https://633eb8de83f50e9ba3b6bb76.mockapi.io/movies-api/'+movieid, body)
        .subscribe(
          data => console.log('edit put success', data),
          error => console.log('edit put oops', error)
        );
      }

    });

  }
}
