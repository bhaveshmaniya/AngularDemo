import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  employee: Employee;
  panelTitle: string;

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit() {
    // Subscribe to route parameter changes and react accordingly
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  saveEmployee(): void {
    // console.log(this.employee);
    const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);
    // Reset Form
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: '-1',
        isActive: null,
        photoPath: null
      };

      // Resetting the form, resets any previous validation errors
      this.createEmployeeForm.reset();
      this.panelTitle = "Create Employee";
    } else {
      // Copy the values into a new object and assign that object as the value for the employee property. Otherwise the employee
      // property holds a reference to the employee object in the array in the EmployeeService. This means any  changes we make 
      // on the form are automatically saved, without we explicitly saving by clicking the Save button.
      this.employee = Object.assign({}, this._employeeService.getEmployee(id));
      this.panelTitle = "Edit Employee";
    }
  }

}
