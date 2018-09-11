import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _route: ActivatedRoute) {
    this.employees = this._route.snapshot.data['employeeList'];

    // Snapshot approach
    if (this._route.snapshot.queryParamMap.has("searchTerm")) {
      this.searchTerm = this._route.snapshot.queryParamMap.get("searchTerm");
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {
  }

  filterEmployees(searchKeyword: string) {
    return this.employees.filter(e => e.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1);
  }
}

