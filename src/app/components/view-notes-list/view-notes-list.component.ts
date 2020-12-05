import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Notu } from 'src/app/shared/services/notu';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-view-notes-list',
  templateUrl: './view-notes-list.component.html',
  styleUrls: ['./view-notes-list.component.css']
})
export class ViewNotesListComponent implements OnInit {
  p: number = 1;                      // Fix for AOT compilation error for NGX pagination
  notus: Notu[];                 // Save students data in Student's array.
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;       // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  notu: Notu;           //declaring notu
  // -----------//
  nutusCollection: AngularFirestoreCollection<any>;
  coll: any;

  constructor(
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService, // Toastr service for alert message
    private afs: AngularFirestore
    ){ }


  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready

    // this.nutusCollection = this.afs.collection<any>('notus-list');
    // this.coll = this.nutusCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => a.payload.doc.data()))
    // );
    // console.log(this.coll);

    this.nutusCollection = this.afs.collection<any>('notus-list');
    this.coll = this.nutusCollection.snapshotChanges().pipe(
      map(actions => {
       return actions.map(doc => {
        console.log('==', doc.payload.doc.id);
        console.log('$==$', doc.payload.doc.data());
        return{
          id: doc.payload.doc.id,
          ... doc.payload.doc.data()
        }
      })
    })
  )
    



    // this.crudApi.GetStudentsList().subscribe(data => {
    //   this.notus = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as Notu ;
    //   })
    // });


    
     // })
   // })
  }

  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.crudApi.GetStudentsList().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  // Method to delete student object
  deleteStudent(id) {
    // this.notu = this.crudApi.GetStudent(id);
    if (window.confirm('Are sure you want to delete this student ?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteStudent(id) // Using Delete student API to delete student.
      
      this.toastr.success('Notes with id:' + id + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }



}
