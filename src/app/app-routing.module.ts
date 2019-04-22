import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../sevices/AuthGuardService';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuardService] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'email', loadChildren: './email/email.module#EmailPageModule', canActivate: [AuthGuardService] },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  // { path: 'members', loadChildren: './members/members.module#MembersPageModule' },
  { path: 'add-acount', loadChildren: './add-acount/add-acount.module#AddAcountPageModule', canActivate: [AuthGuardService] },
  { path: 'edit-acount', loadChildren: './edit-acount/edit-acount.module#EditAcountPageModule', canActivate: [AuthGuardService] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
