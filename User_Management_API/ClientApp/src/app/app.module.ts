



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NormalUserComponent } from './normal-user/normal-user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { EskaUserComponent } from './eska-user/eska-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { CompaniesComponent } from './companies/companies.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { GroupInfoComponent } from './group-info/group-info.component';
import { DeleteCompanyComponent } from './delete-company/delete-company.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { CompanyService } from './company.service';
import { GroupService } from './group.service';
import { UserService } from './user.service';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { EskaGuardGuard } from './guards/eska-guard.guard';
import { AuthService } from './auth.service';
import { HttpInterceptorService } from './http-interceptor.service';
import { ErrorInterceptorService } from './error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    NormalUserComponent,
    AdminUserComponent,
    EskaUserComponent,
    MainMenuComponent,
    CompaniesComponent,
    GroupsComponent,
    UsersComponent,
    ReportComponent,
    ProfileComponent,
    UserInfoComponent,
    CreateUserComponent,
    CreateCompanyComponent,
    CreateGroupComponent,
    CompanyInfoComponent,
    GroupInfoComponent,
    DeleteCompanyComponent,
    DeleteUserComponent,
    DeleteGroupComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,

    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      {
        path: 'mainMenu', component: MainMenuComponent, canActivate: [AuthGuardGuard] ,children: [
          { path: 'Login', component: LoginComponent },
          { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuardGuard]},
          { path: 'Companies', component: CompaniesComponent, canActivate: [EskaGuardGuard] },
          { path: 'Groups', component: GroupsComponent, canActivate: [EskaGuardGuard] },
          { path: 'Users', component: UsersComponent, canActivate: [AdminGuardGuard] },
          { path: 'Report', component: ReportComponent, canActivate: [EskaGuardGuard] },
        ]
      },
      { path: 'forget-password', component: ResetPasswordComponent },
      { path: 'change-password', component: ChangePasswordComponent }
    ]),
    BrowserAnimationsModule,
    MatSidenavModule,

    MatTableModule,
    A11yModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule, MatRippleModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTreeModule,
    OverlayModule,
  ],
  //for the dialog
  entryComponents: [
    UserInfoComponent, CreateUserComponent, CompanyInfoComponent,
    CreateCompanyComponent, GroupInfoComponent, CreateGroupComponent,
    DeleteUserComponent, DeleteGroupComponent, DeleteCompanyComponent
  ],
  providers: [CompanyService, GroupService, UserService, MatDialog, AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }




