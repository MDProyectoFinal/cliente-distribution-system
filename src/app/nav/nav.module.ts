import { NgModule } from '@angular/core';
import { PrincipalNavComponent } from './components/principal-nav/principal-nav.component';

import { CommonModule } from '@angular/common'
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
//import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
    // ,LayoutsModule
  ],
  exports: [
    PrincipalNavComponent
  ],
  declarations: [
    PrincipalNavComponent
  ],
  providers: [],
})
export class NavModule { }
