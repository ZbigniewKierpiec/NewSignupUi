import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { delay, filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  public users: any = [];
  public tokenUser: any = [];
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  ngAfterViewInit() {

    this.observer.observe(['(max-width:800px)']).subscribe((res)=>{

      if(res.matches){
        this.sidenav.mode='over';
        this.sidenav.close();
      }else{
        this.sidenav.mode='side';
        this.sidenav.open();
      }



      })


  }

  logOut() {
    this.snackbar.open('You just logout', undefined, {
      duration: 3000,
      panelClass: ['red-snackbar'],
    });

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 1000);

    this.auth.signOut();
  }
}
