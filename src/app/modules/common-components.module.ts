import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SideComponent } from '../components/side/side.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, SideComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [NavbarComponent, SideComponent]
})
export class CommonComponentsModule { }
