import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  error: string;

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _route: ActivatedRoute) {
    // resolvedData can either be a string or Employee[]
    //const resolvedEmployeeList: ResolvedEmployeeList = this._route.snapshot.data['employeeList'];
    const resolvedData: string | Employee[] = this._route.snapshot.data['employeeList'];

    // If the resolver completed without errors resolvedData is an Employee[]
    // if (resolvedEmployeeList.error == null) {
    //   this.employees = resolvedEmployeeList.employeeList;
    // } else {
    //   this.error = resolvedEmployeeList.error;
    // }
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }

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

  onDeleteNotification(id: number) {
    const foundIndex = this.filteredEmployees.findIndex(e => e.id === id);
    if (foundIndex !== -1) {
      this.filteredEmployees.splice(foundIndex, 1);
    }
  }
}

