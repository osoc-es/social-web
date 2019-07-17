import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AdminComponent } from './admin/admin.component';
import { CreateProjectComponent } from './admin/create-project/create-project.component';
import { CreateConflictComponent } from './admin/create-conflict/create-conflict.component';
import { EditFormComponent } from './admin/edit-form/edit-form.component';
import { AddQuestionComponent } from './admin/add-question/add-question.component';
import { ConflictListComponent } from './conflict-list/conflict-list.component';


const appRoutes: Routes = [
  { path: '' , component: MainComponent },
  { path: 'home', component: HomeComponent },
  { path: 'conflicts/forms', component: QuestionListComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/form', component: EditFormComponent },
  { path: 'conflicts', component: ConflictListComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    MainComponent,
    HomeComponent,
    QuestionListComponent,
    AdminComponent,
    CreateProjectComponent,
    CreateConflictComponent,
    EditFormComponent,
    AddQuestionComponent,
    ConflictListComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [],
  entryComponents: [
    LoginComponent,
    CreateProjectComponent,
    CreateConflictComponent,
    AddQuestionComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
