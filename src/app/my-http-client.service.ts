import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Token} from "./token";

const rootUrl = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class MyHttpClientService {
  token: string = "";

  constructor(private http: HttpClient) {
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(rootUrl + url);
  }

  getPrivate(url: string): Observable<any> {
    return this.http.get<any>(rootUrl + url,
      {
        headers: new HttpHeaders({"Authorization": "Bearer " + this.token})
      });
  }

  getToken(code: string): Observable<any> {
    return this.http.get<Token>(rootUrl +"/auth/callback?code=" +code,
      {observe:"response"})
      .pipe(map((response: HttpResponse<Token>)=> {
      if(response.status == 200 && response.body !== null){
        this.token= response.body.token;
        return true;
      }else {
        return false;
      }
    }));
  }

}
