import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { Department } from '../models/department.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  previewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  dateOfBirth: Date = new Date(2018, 0, 30);
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  gender = 'male';

  constructor() {
    this.datePickerConfig = Object.assign({},
       {
          containerClass: 'theme-dark-blue',
          // showWeekNumbers: true,
          // minDate: new Date(2018, 0, 1),
          // maxDate: new Date(2018, 11, 31),
          dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit() {
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  saveEmployee(empForm: NgForm): void {
    console.log(empForm.value);
  }

}
