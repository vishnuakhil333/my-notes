import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

import { AuthGuard } from "../../shared/guard/auth.guard";
import { AddNotesComponent } from 'src/app/components/add-notes/add-notes.component';
import { ViewNotesListComponent } from 'src/app/components/view-notes-list/view-notes-list.component';
import { EditNotesComponent } from 'src/app/components/edit-notes/edit-notes.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'add-notu', component: AddNotesComponent},
  { path: 'view-notu', component: ViewNotesListComponent },
  { path: 'edit-notu/:id', component: EditNotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
