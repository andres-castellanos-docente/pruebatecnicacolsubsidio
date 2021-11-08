import {Component} from '@angular/core';
import {subirAnimation} from '../../animations/listanim.animations';

@Component({
  selector: 'app-princroot',
  templateUrl: './app.princ.component.html', styleUrls: ['./app.princ.scss'],
  animations: [subirAnimation]
})
export class AppPrincComponent {
  constructor() {
  }

  sidebarActive: boolean = false;
  menuHorizontal: boolean | undefined;

  onMenuButtonClick(event: Event): void {
    this.sidebarActive = !this.sidebarActive;
    event.preventDefault();
  }

  isDesktop(): boolean {
    return window.innerWidth > 1024;
  }

  onMaskClick(event: Event): void {
    this.sidebarActive = !this.sidebarActive;
    let element: Element | null;
    element = document.querySelector("#princ");
    let elementdivmask: Element | null;
    elementdivmask = document.querySelector("#divmask");
    ((element) && (elementdivmask)) ? (
      element.classList.add('layout-overlay-active'),
        elementdivmask.classList.add('disblock')
    ) : ('');
    (this.sidebarActive) ? (
      ((element) && (elementdivmask)) ? (
        element.classList.add('layout-overlay-active'),
          elementdivmask.classList.add('disblock')
      ) : ('')
    ) : (
      ((element) && (elementdivmask)) ? (
        element.classList.remove('layout-overlay-active'),
          elementdivmask.classList.remove('disblock')
      ) : ('')
    );
    event.preventDefault();
  }
}
