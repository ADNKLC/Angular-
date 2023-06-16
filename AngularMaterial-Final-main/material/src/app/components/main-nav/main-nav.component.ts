import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  kadi!:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
      public servis:ApiService
    ){ }

  ngOnInit(): void {
    if(this.servis.oturumKontrol()){
      this.kadi = localStorage.getItem("kadi");
    }
  }

  oturumKapat(){
    localStorage.clear();
    location.href = "/";
  }
}
