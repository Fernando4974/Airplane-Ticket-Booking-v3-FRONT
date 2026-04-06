import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/bookingServices/booking.service';
import { BookingRes } from '../../../common/interfaces/BookingRes';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  bookings: BookingRes[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  isLastPage: boolean = false;
  loading: boolean = false;
  userId:number = 0;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
    this.userId = parseInt(sessionStorage.getItem("userId")!);
  }

  loadBookings() {
    this.loading = true;
  
    this.bookingService.findBookingByUserId(parseInt(sessionStorage.getItem("userId")!),this.currentPage, 3).subscribe({
      next: (data) => {
        //console.log(data)
        //console.log(this.userId)
        this.bookings = data.data.content;
        this.totalPages = data.data.totalPages;
        this.isLastPage = data.data.last;
        this.loading = false;
      },
      error: (err) =>{ this.loading = false;
        // console.log(err);
        }
      
    });
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.loadBookings();
  }

}
