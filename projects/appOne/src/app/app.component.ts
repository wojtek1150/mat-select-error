import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'main/core/store/reducers';
import { Authorize } from 'main/core/store/actions/authentication.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new Authorize());
  }

}
