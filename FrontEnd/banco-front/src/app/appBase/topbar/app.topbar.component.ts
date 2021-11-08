import {Component, OnInit} from '@angular/core';
import {AppPrincComponent} from '../princ/app.princ.component';
import {
  derAIzAnimation,
  IzADerAnimation, bannerAnimation
} from '../../animations/listanim.animations';
import {Observable} from "rxjs";
import {BannerPublic, BannerpublicidadService} from "./bannerpublicidad.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html', styleUrls: ['./app.topbar.scss'],
  animations: [derAIzAnimation, IzADerAnimation, bannerAnimation]
})
export class AppTopBarComponent implements OnInit {
  darken: boolean | undefined;
  datos$: Observable<BannerPublic> | undefined;
  icon_url: string | undefined;
  url: string | undefined;
  value: string | undefined;
  antvalue: string | undefined;


  constructor(public app: AppPrincComponent, private bannerPub: BannerpublicidadService) {
  }

  ngOnInit(): void {
    (localStorage.getItem('dark') === 'S') ? (
      this.refrescar(true)
    ) : (localStorage.getItem('dark') === 'N') ? (
      this.refrescar(false)
    ) :(
      this.refrescar(window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', (e) => {
      this.refrescar(e.matches);
    });

    this.datos$ = this.bannerPub.getInfoBanner();
    this.datos$.subscribe(x => {
      this.url = x.url;
      this.icon_url = x.icon_url;
      this.antvalue = x.value;
      this.value = "";
      const self = this;
      setTimeout(() => {
        self.value = x.value;
      }, 200);
    });

  }

  refrescar(turnOn: boolean): void {
    this.onChange(turnOn);
  }

  onChange(enable: boolean): void {
    (enable) ? (
        localStorage.setItem('dark', 'S'),
        this.changeStyleSheetUrl('layout-css', 'blue-dark', 'layout')
    ) : (
        localStorage.setItem('dark', 'N'),
        this.changeStyleSheetUrl('layout-css', 'blue-light', 'layout')
    );
    this.darken = enable;
  }

  changeStyleSheetUrl(id: string, value: string, prefix: string): void {
    let element: Element | null;
    element = document.querySelector("#layout-css");
    let urlTok: any | null;
    let urlTokens: any | null;
    urlTok = element!.getAttribute("href");
    urlTokens = urlTok!.split('/');
    urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
    const newURL = urlTokens.join('/');
    element!.setAttribute('href', newURL);
  }
}
