import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { AdminListComponent } from '@app/admin-list/admin-list.component';
import { AdminCategoryListComponent } from '@app/admin-category-list/admin-category-list.component';
import { AddAudioComponent } from '@app/add-audio/add-audio.component';
import { UserhomeComponent } from '@app/userhome/userhome.component';

import { AuthenticationGuard } from '@app/auth';
import { EditComponent } from '@app/edit/edit.component';
import { AuthenticationroleGuard } from '@app/auth/authenticationrole.guard';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') }, canActivate: [AuthenticationroleGuard] },
    // { path: 'userhome',component:UserhomeComponent, pathMatch: 'full' },
    { path: 'adminlist', component: AdminListComponent, pathMatch: 'full', canActivate: [AuthenticationroleGuard] },
    { path: 'categorylisting', component: AdminCategoryListComponent, pathMatch: 'full',canActivate: [AuthenticationroleGuard] },
    { path: 'add_audio', component: AddAudioComponent, pathMatch: 'full' ,canActivate: [AuthenticationroleGuard]},
    // { path: 'edit',component:EditAudioComponent, pathMatch: 'full',  },
    { path: 'edit', component: EditComponent, pathMatch: 'full',canActivate: [AuthenticationroleGuard] },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
