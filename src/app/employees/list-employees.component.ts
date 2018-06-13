import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  employeeToDisplay: Employee;

  constructor(private _employeeService: EmployeeService,
    private _router: Router) { }

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.employeeToDisplay = this.employees[0];
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId]);
  }

}

