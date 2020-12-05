import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {
  public studentForm: FormGroup;  // Define FormGroup to student's form
 
  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private router: Router           // Router service to navigate to specific component

  ) { }

 
  ngOnInit() {
    this.crudApi.GetStudentsList();  // Call GetStudentsList() before main form is being called
    this.studenForm();              // Call student form when component is ready
  }

  // Reactive student form
  studenForm() {
    this.studentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      // mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      // email: [''],
      // mobileNumber: ['']
    })  
  }

  // Accessing form control using getters
  get firstName() {
    return this.studentForm.get('title');
  }

  get lastName() {
    return this.studentForm.get('description');
  }  

  get email() {
    return this.studentForm.get('email');
  }

  get mobileNumber() {
    return this.studentForm.get('mobileNumber');
  }

  // Reset student form's values
  ResetForm() {
    this.studentForm.reset();
  }  
 
  submitStudentData() {
    this.crudApi.AddStudent(this.studentForm.value); // Submit student data using CRUD API
    this.toastr.success(this.studentForm.controls['title'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.router.navigate(['view-notu']);
    this.ResetForm();  // Reset form when clicked on reset button
                 // Navigate to student's list page when student data is updated

   };


}
