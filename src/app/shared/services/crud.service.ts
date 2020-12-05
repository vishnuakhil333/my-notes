import { Injectable, NgZone } from '@angular/core';
import { Notu } from './notu';  // Student data type interface class
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  notusRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  notuRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  notuData: any;

  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFirestore,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone) {

    // this.afAuth.authState.subscribe(notu => {
    //   if (notu) {
    //     this.notuData = notu;
    //     localStorage.setItem('notu', JSON.stringify(this.notuData));
    //     JSON.parse(localStorage.getItem('notu'));
    //   } else {
    //     localStorage.setItem('notu', null);
    //     JSON.parse(localStorage.getItem('notu'));
    //   }
    // })
   }

  // Create Student
  AddStudent(notu: Notu) {
    // this.notusRef.push({
    //   title: notu.title,
    //   description: notu.description,
    //   // email: student.email,
    //   // mobileNumber: student.mobileNumber
    // })

    // For CloudFirestore
    return this.db.collection('notus-list').add(notu);

  }

  // Fetch Single Student Object
  GetStudent(id: string) {
    return this.db.collection('notus-list/' + id).get()

  }

  // Fetch Students List
  GetStudentsList() {
    // this.notusRef = this.db.list('notus-list');
    // return this.notusRef;
    return this.db.collection('notus-list').snapshotChanges();
  }

  // Update Student Object
  UpdateStudent(notu) {
    // this.notuRef.update({
    //   title: notu.title,
    //   description: notu.description,
    //   // email: student.email,
    //   // mobileNumber: student.mobileNumber
    // })
    return this.db.doc('notus-list/' + notu.id).update(notu)
  }  

  // Delete Student Object
  DeleteStudent(id: string) { 
    // this.notuRef = this.db.object('notus-list/'+id);
    // this.notuRef.remove();
    return this.db.doc('notus-list/' + id).delete()
  }

  // SetNotuData(notu) {
  //   const notuRef: AngularFirestoreDocument<any> = this.afs.doc(`notus-list/${notu.title}`);
  //   const notuData: Notu = {
  //     $key: notu.id,
  //     title: notu.title,
  //     description: notu.description 
  //   }
  //   return notuRef.set(notuData, {
  //     merge: true
  //   })
  // }

  
}