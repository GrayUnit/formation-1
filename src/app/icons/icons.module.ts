import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDeleteComponent } from './components/icon-delete/icon-delete.component';
import { IconMenuComponent } from './components/icon-menu/icon-menu.component';
import { IconUpdateComponent } from './components/icon-update/icon-update.component';



@NgModule({
  declarations: [IconMenuComponent, IconDeleteComponent, IconUpdateComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
     IconMenuComponent,IconDeleteComponent, IconUpdateComponent
  ]
})
export class IconsModule { }
