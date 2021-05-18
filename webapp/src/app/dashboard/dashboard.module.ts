import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HomeRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsModalComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    FormsModule
  ],
  entryComponents: [
    SettingsModalComponent
  ]
})
export class DashboardModule { }
