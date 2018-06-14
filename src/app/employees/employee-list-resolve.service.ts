import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Employee } from "../models/employee.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { EmployeeService } from "./employee.service";

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[]> {
    constructor(private _employeeService: EmployeeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
        return this._employeeService.getEmployees();
    }
}