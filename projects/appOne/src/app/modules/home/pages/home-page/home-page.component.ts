import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

import { AppState, currentUser, routerState } from 'main/core/store/reducers';
import { Navigate } from 'main/core/store/actions/router.actions';

import { LoadUsers } from 'projects/appOne/src/app/store/actions/user.actions';

@Component({
  selector: 'appOne-home-page',
  template: `
    <home-page>
      <router-outlet></router-outlet>
    </home-page>
  `,
  styles: [`
    :host {
      display: flex;
      flex: 1;
      flex-flow: column;
      overflow-x: hidden;
      overflow-y: auto;
    }
  `]
})
export class HomePageComponent implements OnInit {

  constructor(private matDialog: MatDialog, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.handleUserRedirection();
  }

  private handleUserRedirection() {
    combineLatest(
      this.store.pipe(select(currentUser), take(1)),
      this.store.pipe(select(routerState), take(1))
    ).subscribe(([user, routerState]) => {
      if (user && user.activeRoles.length) {
        this.store.dispatch(new LoadUsers());
      }
      if (routerState.url === '/home') {
        this.store.dispatch(new Navigate([user.activeRoles.length ? '/home/applications' : '/home/applications/form']));
      }
    });
  }
}
