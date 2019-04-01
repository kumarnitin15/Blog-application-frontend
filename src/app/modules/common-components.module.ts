import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SideComponent } from '../components/side/side.component';

@NgModule({
  declarations: [NavbarComponent, SideComponent],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent, SideComponent]
})
export class CommonComponentsModule { }
