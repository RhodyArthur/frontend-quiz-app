import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resp } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  private jsonFileUrl = 'assets/data.json'

  fetchQuizData() {
    return this.http.get<Resp>(this.jsonFileUrl)
  }
}
