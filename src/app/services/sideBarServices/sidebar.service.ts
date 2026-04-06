import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  // Usamos WritableSignal (Angular 17+) para mejor rendimiento
  isCollapsed = signal(false);

  toggle() {
    this.isCollapsed.update(v => !v);
  }
}
