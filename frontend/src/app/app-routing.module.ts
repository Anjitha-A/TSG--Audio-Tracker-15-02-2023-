import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAudioComponent } from './add-audio/add-audio.component';
import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
// import { AdminAddCategoryComponent } from './admin-add-category/admin-add-category.component';
// import { AdminCategoryListService } from './admin-category-list/admin-category-list.service';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AuthenticationGuard } from './auth';
import { LoginComponent } from './auth/login/login.component';

import { SearchComponent } from './search/search.component';
import { UserViewAudioComponent } from './user-view-audio/user-view-audio.component';
import { UserhomeComponent } from './userhome/userhome.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  // { path: '',component:LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  // { path: 'adminlist',component:AdminListComponent, pathMatch: 'full' },
  // { path: 'categorylisting',component:AdminCategoryListComponent, pathMatch: 'full' },
  // { path: 'add_audio',component:AddAudioComponent, pathMatch: 'full' },
  // { path: 'edit_audio',component:EditAudioComponent, pathMatch: 'full' },
  { path: 'userhome', component: UserhomeComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },
  { path: 'user_view_audio', component: UserhomeComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },
  { path: 'user_get_audio', component: UserViewAudioComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },
  { path: 'search_audio', component: SearchComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
