import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environments.dev';
import { HttpClient } from '@angular/common/http';
import { BookingReqSave } from '../../common/dtos/BookingReqSave.dto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  appUrl:string = enviroment.apiUrl;
  bookingUrl:string = "/booking"
  bookingSaveUrl:string = "/save"
  bookingFindByUserIdUrl:string = "/"

  constructor(private http: HttpClient) {}

/**
 * save
bookingToSave :Booking */
public save(bookingToSave :BookingReqSave):Observable<any> {
// console.log(`${this.appUrl}${this.bookingUrl}${this.bookingSaveUrl}`)
  return this.http.post(`${this.appUrl}${this.bookingUrl}${this.bookingSaveUrl}`,bookingToSave)
}
public findBookingByUserId(userId:number,page:number,size:number):Observable<any> {
//console.log(`${this.appUrl}${this.bookingUrl}${this.bookingFindByUserIdUrl}${userId}`)
  return this.http.get(`${this.appUrl}${this.bookingUrl}${this.bookingFindByUserIdUrl}${userId}`)
}


}
