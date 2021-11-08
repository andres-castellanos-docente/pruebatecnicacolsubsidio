import {Component, Input, OnInit, HostListener} from '@angular/core';
import {AppPrincComponent} from '../princ/app.princ.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IzADerAnimation, subirAnimationMenu} from '../../animations/listanim.animations';
import {MenuItem} from './app-menuitemInterf';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html', styleUrls: ['./app.menu.scss'],
  animations: [subirAnimationMenu, IzADerAnimation]
})
export class AppMenuComponent implements OnInit {
  model: MenuItem | MenuItem[] | MenuItem[][] | any | undefined;
  verTipMenu: boolean = false;
  mostTipMenu: boolean | undefined;

  constructor(public app: AppPrincComponent, private router: Router) {
    this.app.menuHorizontal = localStorage.getItem('tipMenu') === 'H' ? true : false;
    this.verTipMenu = window.innerWidth > 1024 ? true : false;
    this.cargarMenu();
  }

  cargarMenu(): void {
    this.model = [
      {
        label: 'Admin',
        icon: 'fa-align-center',
        items: [{label: 'Clientes', routerLink: ['/modulos/clientes'], icon: 'fa-user'}]
      },
      {label: 'Reporte', routerLink: ['/modulos/reporte'], icon: 'fa-user'}
    ];
  }

  mostrarTipMenu(): void {
    this.mostTipMenu = !this.mostTipMenu;
  }

  cambiarTipMenu(menHor: boolean) {
    this.app.menuHorizontal = menHor;
    const tipmenu = menHor ? 'H' : 'V';
    localStorage.setItem('tipMenu', tipmenu);
    this.mostTipMenu = !this.mostTipMenu;
  }

  ngOnInit(): void {
    const self = this;
    setTimeout(() => {
      self.app.sidebarActive = window.innerWidth >= 1024 ? true : false;
    }, 1200);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth < 1024) {
      // Solo se muestra tipo de menu resoluciones mayores a 1024
      this.verTipMenu = false;
      // Evita que el boton menu se pierda
      (this.app.menuHorizontal) ? (
        localStorage.setItem('tipMenu', 'V'),
          this.app.menuHorizontal = false
      ) : ('');
      let element: Element | null;
      element = document.querySelector("#princ");
      (!element?.classList.contains('layout-mobile-active')) ? (
        this.app.sidebarActive = false
      ) : ('');
    } else {
      this.app.sidebarActive = true;
      this.verTipMenu = true;
    }
  }
}

@Component({
  selector: '[app-submenu]',
  templateUrl: './app.submenu.component.html',
  animations: [
    trigger('children', [
      state('visible', style({
        height: '*'
      })),
      state('hidden', style({
        height: '0px'
      })),
      transition('visible => hidden', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppSubMenuComponent {
  @Input() item: MenuItem | MenuItem[] | MenuItem[][] | any | undefined;
  @Input() root: string | boolean | undefined;
  activeIndex: number = -1;

  constructor(public app: AppPrincComponent, private router: Router) {
  }

  itemClick(event: Event, item: MenuItem, index: number): void {
    if (item.disabled) {
      event.preventDefault();
    }
    if (item.routerLink || item.items || item.command || item.url) {
      this.activeIndex = (this.activeIndex as number === index) ? -1 : index;
    }
    if (item.command) {
      item.command({originalEvent: event, iteme: item});
    }
    if (item.items || (!item.url && !item.routerLink)) {
      event.preventDefault();
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  isActiveRoute(route: string): boolean {
    if (route) {
      route = route[0];
      return this.router.url === route || route.indexOf(this.router.url + '/') > -1;
    }
    return false;
  }
}
