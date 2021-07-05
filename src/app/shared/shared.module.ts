import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, NopagefoundComponent],
  imports: [CommonModule, RouterModule, ConfirmDialogModule],
  exports: [HeaderComponent, SidebarComponent, NopagefoundComponent]
})
export class SharedModule {}