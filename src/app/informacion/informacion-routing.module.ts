import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InformacionGeneralComponent } from "./pages/informacion-general/informacion-general.component";

const routes: Routes = [
  {
      path: 'informacion-general',
      component: InformacionGeneralComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [RouterModule]
})
export class InformacionRoutingModule { }
