import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardFormComponent } from './components/card-form/card-form.component';

const routes: Routes = [{ path: '', component: CardFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardFormsRoutingModule {}
