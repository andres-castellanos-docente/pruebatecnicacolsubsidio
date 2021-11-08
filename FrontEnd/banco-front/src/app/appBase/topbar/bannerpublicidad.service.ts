import {Injectable, OnDestroy} from '@angular/core';
import {timer, Observable, Subject, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BannerPublic {
  icon_url: string | undefined;
  url: string | undefined;
  value: string | undefined;
}

@Injectable()
export class BannerpublicidadService implements OnDestroy {
  banner: Observable<Date>;
  infoBanner$ = new Subject<BannerPublic>();
  vr: BannerPublic | undefined;
  icon_url: string | undefined;
  url: string | undefined;
  value: string | undefined;
  s: Subscription | undefined

  constructor(private http: HttpClient) {
    this.banner = timer(0, environment.tiempoAnuncPub).pipe(map(t => new Date()), shareReplay(1));
  }

  getBanner(): Observable<any> {
    return this.http.get(environment.apiExtPub, {})
  }

  getInfoBanner(): Observable<BannerPublic> {
    this.s = this.banner.subscribe(t => {
      this.getBanner().subscribe({
        next: (v) => {
          const data = v as any;
          this.vr = {
            icon_url: data.icon_url,
            url: data.url,
            value: data.value
          };
          this.infoBanner$.next(this.vr);
        },
        error: (e) => {
          console.error('error al cargar publicidad')
        }
      });
    });
    return this.infoBanner$.asObservable();
  }

  ngOnDestroy(): void {
    this.s?.unsubscribe();
  }
}
