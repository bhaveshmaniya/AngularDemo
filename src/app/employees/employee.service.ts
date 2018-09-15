import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
    constructor(private _httpClient: HttpClient) {
    }

    private listEmployees: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'Male',
            contactPreference: 'Email',
            email: 'mark@pragimtech.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/mark.png'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'Female',
            contactPreference: 'Phone',
            phoneNumber: 2345978640,
            dateOfBirth: new Date('11/20/1979'),
            department: '2',
            isActive: true,
            photoPath: 'assets/images/mary.png'
        },
        {
            id: 3,
            name: 'John',
            gender: 'Male',
            contactPreference: 'Phone',
            phoneNumber: 5432978640,
            dateOfBirth: new Date('3/25/1976'),
            department: '3',
            isActive: false,
            photoPath: 'assets/images/john.png'
        },
    ];

    getEmployees(): Observable<Employee[]> {
        //return Observable.of(this.listEmployees).delay(2000);
        //return this._httpClient.get<Employee[]>('http://localhost:3000/employees').delay(2000);
        return this._httpClient.get<Employee[]>('http://localhost:3000/employees')
            //.catch(this.handleError);
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }

        // return an observable with a meaningful error message to the end user
        return new ErrorObservable('There is a problem with the service.We are notified & working on it. Please try again later.');
    }

    getEmployee(id: number): Employee {
        return this.listEmployees.find(e => e.id === id);
    }

    save(employee: Employee) {
        if (employee.id == null) {
            var maxId = this.listEmployees.reduce(function (e1, e2) {
                return (e1.id > e2.id ? e1 : e2);
            }).id;

            // Increment Id value
            employee.id = maxId + 1;
            this.listEmployees.push(employee);
        } else {
            var foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
            this.listEmployees[foundIndex] = employee;
        }
    }

    deleteEmployee(id: number) {
        var foundIndex = this.listEmployees.findIndex(e => e.id === id);
        if (foundIndex !== -1) {
            this.listEmployees.splice(foundIndex, 1);
        }
    }
}
