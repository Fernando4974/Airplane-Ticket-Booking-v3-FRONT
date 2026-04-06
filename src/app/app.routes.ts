import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FlightComponent } from './pages/flight/flight.component';
import { BookingComponent } from './pages/booking/save/booking.component';
import { MyBookingsComponent } from './pages/booking/my-bookings/my-bookings.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "flight", component: FlightComponent },
    { path: "booking-save/:flightNumber", component: BookingComponent },
    { path: "my-bookings/:userId", component:MyBookingsComponent}

];
