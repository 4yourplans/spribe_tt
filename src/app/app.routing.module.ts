import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'card-forms', pathMatch: 'full' },
  {
    path: 'card-forms',
    loadChildren: () =>
      import('./features/card-forms/card-forms.module').then(
        (m) => m.CardFormsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
