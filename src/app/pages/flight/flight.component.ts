import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flightServices/flight.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit{

constructor(private _flightService: FlightService, private router:Router){}
  flights = [
  { origin: 'MDE', destination: 'MAD',flightStatus:'', flightNumber:'', leavedDate: '' },
  { origin: 'BOG', destination: 'JFK',flightStatus:'', flightNumber:'', leavedDate: '' },
  { origin: 'CLO', destination: 'MEX',flightStatus:'', flightNumber:'', leavedDate: '' }
];

ngOnInit(): void {

this.findAll()

}

 public findAll(){
   this._flightService.findAll().subscribe({

    next:(data)=>{
      console.log(data.data.content)
      this.flights=data.data.content;
    },
    error:(err)=>{
      console.log("error:")
      console.log(err)
    }


  })
}
public search(id:string){
  this.router.navigate([`/booking-save/${id}`])
}

}
