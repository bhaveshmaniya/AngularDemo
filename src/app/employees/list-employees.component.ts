import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  employeeToDisplay: Employee;
  filteredEmployees: Employee[];

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this._employeeService.getEmployees().subscribe((empList) => {
      this.employees = empList;
      this.employeeToDisplay = this.employees[0];

      // console.log(this._route.snapshot.queryParamMap.has("searchTerm"));
      // console.log(this._route.snapshot.queryParamMap.get("searchTerm"));
      // console.log(this._route.snapshot.queryParamMap.getAll("searchTerm"));
      // console.log(this._route.snapshot.queryParamMap.keys);

      // Snapshot approach
      // if (this._route.snapshot.queryParamMap.has("searchTerm")) {
      //   this.searchTerm = this._route.snapshot.queryParamMap.get("searchTerm");
      // } else {
      //   this.filteredEmployees = this.employees;
      // }

      // Observable approach
      this._route.queryParamMap.subscribe((queryParams) => {
        if (queryParams.has("searchTerm")) {
          this.searchTerm = queryParams.get("searchTerm");
        } else {
          this.filteredEmployees = this.employees;
        }
      });
    });
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  filterEmployees(searchKeyword: string) {
    return this.employees.filter(e => e.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1);
  }

  changeEmployeeName() {
    this.employees[0].name = "Jordan";
    this.filteredEmployees = this.filterEmployees(this.searchTerm);
  }
}

