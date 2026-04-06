import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { SidebarService } from '../../services/sideBarServices/sidebar.service';
; // Asegura la ruta correcta

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // Inyectamos el servicio
  constructor(
    private location: Location,
    public sidebarService: SidebarService
  ) {}

  toggleSidebar() {
    // Usamos el método del servicio en lugar de una variable local
    this.sidebarService.toggle();
  }

  goBack() {
    this.location.back();
  }
}
