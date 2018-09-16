import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Input() searchTerm: string;
  selectedEmployeeId: number;

  // This output event will be used to notify parent component
  // Ex: ListEmployeesComponent when an employee is deleted. so the  ListEmployeesComponent can delete that respective
  //     employee from the filteredEmployees array to which the template is bound
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();

  // This property is used in the view template to show and hide delete confirmation
  confirmDelete = false;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => { console.log(`Employee with Id=${this.employee.id} deleted`); },
      (err) => { console.log(err); }
    );
    // Raise notifyDelete event, so  the ListEemployeesComponent can delete the same employee from it's filtered list array
    this.notifyDelete.emit(this.employee.id);
  }
}
