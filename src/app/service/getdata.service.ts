import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private http: HttpClient) { }

  getmoviedata()
  {
    console.log('Hello','In sevice');
    return this.http.get('https://633eb8de83f50e9ba3b6bb76.mockapi.io/movies-api');
  }

  getuserdata()
  {
    console.log('Hello','In sevice');
    return this.http.get('https://6348f1120b382d796c7a68cb.mockapi.io/users');
  }

}
