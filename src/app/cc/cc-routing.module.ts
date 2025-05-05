import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CcComponent } from './cc.component';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: CcComponent },
  { path: 'add', component: AddComponent }, 
  { path:'add/:id',component:AddComponent},
  { path:'view/:id',component:ViewComponent},
  { path:'edit/:id',component:EditComponent},
  { path:'delete/:id',component:DeleteComponent},
  { path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcRoutingModule { }
