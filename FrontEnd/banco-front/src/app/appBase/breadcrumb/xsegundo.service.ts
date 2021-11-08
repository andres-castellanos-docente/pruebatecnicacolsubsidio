import {Injectable, OnDestroy} from '@angular/core';
import {timer, Observable, Subject, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ValorReloj {
    hora: number | undefined;
    minutes: string| undefined;
    ampm: string | undefined;
    diadesemana: string| undefined;
    diaymes: string| undefined;
    segundo: string| undefined;
}

@Injectable()
export class XsegundoService implements OnDestroy {
    clock: Observable<Date>;
    s : Subscription | undefined;
    infofecha$ = new Subject<ValorReloj>();
    vr: ValorReloj | undefined;
    ampm: string | undefined;
    hours: number | undefined;
    minute: string | undefined;
    weekday: string | undefined;
    months: string | undefined;

    constructor() {
        this.clock = timer(0, 1000).pipe(map(t => new Date()), shareReplay(1));
    }

    getInfoReloj(): Observable<ValorReloj> {
      this.s =this.clock.subscribe(t => {
            this.hours = t.getHours() % 12;
            this.hours = this.hours ? this.hours : 12;
            this.vr = {
                hora: this.hours,
                minutes: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString(),
                ampm: t.getHours() > 11 ? 'PM' : 'AM',
                diaymes: t.toLocaleString('es-CO', {day: '2-digit', month: 'long', year: 'numeric'}).replace('.', '').replace('-', ' '),
                diadesemana: t.toLocaleString('es-CO', {weekday: 'long'}).replace('.', ''),
                segundo: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString()
            };
            this.infofecha$.next(this.vr);
        });
        return this.infofecha$.asObservable();
    }

  ngOnDestroy(): void {
    this.s?.unsubscribe();
  }

}
