import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environments.dev';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginationDto } from '../../common/dtos/pagination.dto';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

    private appUrl:string;
    private findAllFlightUrl:string;
    private flightUrl:string;
    private flightNumberUrl:string;


    constructor(
      private readonly http: HttpClient,
      private readonly router: Router


    ) {
      this.appUrl=enviroment.apiUrl;
      this.findAllFlightUrl="/all";
      this.flightUrl="/flight";
      this.flightNumberUrl="/";
    }
    public findAll(paginationDto?:PaginationDto):Observable<any>{
      const limit = paginationDto?.limit||3;
      const offset = paginationDto?.offset||0;

      const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString())
       return  this.http.get(`${this.appUrl}${this.flightUrl}${this.findAllFlightUrl}`,{params});
    }
     public findByFlightNumber(flightNumber:string):Observable<any>{
       return  this.http.get(`${this.appUrl}${this.flightUrl}${this.flightNumberUrl}${flightNumber}`);
    }

}
