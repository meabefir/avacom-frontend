import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelperRoutingModule } from './helper-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HelperRoutingModule,

    MatSnackBarModule
  ]
})
export class HelperModule { }
