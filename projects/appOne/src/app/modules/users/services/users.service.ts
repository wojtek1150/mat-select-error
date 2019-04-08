import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeModule } from 'projects/appOne/src/app/modules/home/home.module';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: HomeModule
})
export class UsersService {

  getAllUsers(): Observable<any> {
    return of(true);
  }

}
