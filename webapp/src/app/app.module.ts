import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {CoreModule} from './core/core.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {SidebarComponent} from './shared/layout/sidebar/sidebar.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent, FooterComponent, HeaderComponent, SidebarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    CoreModule,
    DashboardModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
