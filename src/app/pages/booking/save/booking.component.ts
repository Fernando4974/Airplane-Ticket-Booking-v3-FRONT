import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { FlightRes } from '../../../common/dtos/FlightRes.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../../services/flightServices/flight.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingReqSave } from '../../../common/dtos/BookingReqSave.dto';
import { BookingService } from '../../../services/bookingServices/booking.service';
import { AlertComponent } from '../../../components/alert/alert.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, AlertComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  flight!: FlightRes;// Datos traídos de tu API
  ticketCount: number = 1;
  totalPrice: number = 0;
  flightNumber!: string;

  constructor(
    private route: ActivatedRoute,
    private _flightService: FlightService,
    private _bookingService: BookingService,
    private router: Router
  ) { }
  ngOnInit(): void {

    this.flightNumber = this.route.snapshot.paramMap.get('flightNumber') || '';
    this.flightSearch(this.flightNumber);
  }

  flightSearch(flightNumber: string) {

    return this._flightService.findByFlightNumber(flightNumber).subscribe({
      next: (data) => {
        this.flight = data.data;

      },
      error: (err) => {
        console.log(err)
      },
    })

  }
  updateTotal() {
    this.totalPrice = this.ticketCount * this.flight.price;
  }

  increaseTickets() {
    if (this.ticketCount < (this.flight.totalSeats - this.flight.occupiedSeats)) {
      this.ticketCount++;
      this.updateTotal();
    }
  }

  decreaseTickets() {
    if (this.ticketCount > 1) {
      this.ticketCount--;
      this.updateTotal();
    }
  }
  submitBooking() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      const booking: BookingReqSave = {
        userId: parseInt(userId),
        flightNumber: this.flightNumber,
        ticketCount: this.ticketCount
      }
      this._bookingService.save(booking).subscribe({
        next: (value) => {
          this.confirmarReserva();
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else {
      alert("UserId not found on Session Storage")
    }

  }
  getDuration(arrived: string, leaved: string): string {
    const start = new Date(leaved);
    const end = new Date(arrived);

    // Diferencia en milisegundos
    const diffMs = end.getTime() - start.getTime();

    // Convertir a horas y minutos
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffMins = Math.round((diffMs % 3600000) / 60000);

    return `${diffHrs}h ${diffMins}m`;
  }
  showAlert: boolean = false;

  confirmarReserva() {

    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
      this.router.navigate(["/home"])

    }, 4000);
  }


}
