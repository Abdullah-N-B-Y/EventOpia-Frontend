import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPointURL } from 'src/constants/constants';
import { User } from '../shared/Data/User';
import { Observable } from 'rxjs/internal/Observable';
import { Profile } from '../shared/Data/Profile';
import { catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { createFormDataFromObject } from '../shared/utilities/createFormDataFromObject';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private http: HttpClient) {}

    updateProfile(profile: Profile): Observable<boolean> {
        console.log('here 2');
        let formData: FormData = new FormData();
        formData = createFormDataFromObject(profile);

        return this.http
            .put(endPointURL + 'Profile/UpdateProfile', formData)
            .pipe(
                map((resp: any) => {
                    console.log('Password changed successfully', resp);
                    return true;
                }),
                catchError((err) => {
                    console.error(
                        'Error changing password',
                        err.messageReceivers
                    );
                    return of(false);
                })
            );
    }
    changePassword(body: any, id: number): Observable<boolean> {
        return this.http
            .put(endPointURL + `User/UpdatePassword/${id}`, body)
            .pipe(
                map((resp: any) => {
                    console.log('Password changed successfully', resp);
                    return true;
                }),
                catchError((err) => {
                    console.error(
                        'Error changing password',
                        err.messageReceivers
                    );
                    return of(false);
                })
            );
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(endPointURL + `User/GetUserById/${id}`);
    }

    getProfileByUserId(id: number): Observable<Profile> {
        return new Observable<Profile>((observer) => {
            this.http
                .get<Profile>(endPointURL + `Profile/GetProfileByUserId/${id}`)
                .subscribe(
                    (response: Profile) => {
                        console.log(response);
                        observer.next(response);
                        observer.complete();
                    },
                    (error: any) => {
                        console.error('An error occurred:', error);
                        observer.error(error);
                    }
                );
        });
    }
}
