import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private lastDeltaY = 0;
  private scrollTimeout: any;

  constructor(private router: Router) {}

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.ctrlKey || event.deltaMode === 0) { // Detects touchpad scroll
      if (Math.abs(event.deltaY - this.lastDeltaY) > 30) { // Adjust sensitivity
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          this.router.navigate(['/login']); // Navigate to new route
        }, 500);
      }
      this.lastDeltaY = event.deltaY;
    }
  }
}