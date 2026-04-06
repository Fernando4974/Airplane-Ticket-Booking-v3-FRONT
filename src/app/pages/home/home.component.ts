import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    userId:number=0;
  constructor(private router: Router){
        const userId = sessionStorage.getItem('userId')
    if (userId) this.userId=parseInt(userId);
  }
  flight(){

    this.router.navigate(["/flight"])

  }
  myBookings(){

    this.router.navigate([`/my-bookings/${this.userId}`])

  }

}
