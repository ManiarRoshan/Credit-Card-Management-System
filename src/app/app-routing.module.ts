import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cc', pathMatch: 'full' },
  { path: 'cc', loadChildren: () => import('./cc/cc.module').then(m => m.CcModule) },
  { path: '**', redirectTo: 'cc' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
