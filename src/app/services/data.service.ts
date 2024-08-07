import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  private jsonFileUrl = 'assets/data.json'

  fetchQuizData(): Observable<Response[]> {
    return this.http.get<Response[]>(this.jsonFileUrl)
  }
}
