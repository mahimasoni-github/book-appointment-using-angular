import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookSlotComponent} from './book-slot/book-slot.component';
import {ChooseSlotComponent} from './choose-slot/choose-slot.component';

const routes: Routes = [
  {component: ChooseSlotComponent, path:'book-slot'},
  {component: BookSlotComponent, path:'book-slot/details/:id'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
