import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WebsocketService} from '../core/services/websocket.service';
import {faPlay, faPause, faPlayCircle, faPauseCircle, faCog} from '@fortawesome/free-solid-svg-icons';
import {AdminService} from '../core/services/admin.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SettingsModalComponent} from './settings-modal/settings-modal.component';

export interface StationStatistics {
  instant: string;
  station: Station;
  statistics: Statistics;
}

export interface Station {
  id: string;
  serial: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Statistics {
  gas: Result;
  pollution: Result;
}

export interface Result {
  successCount: number;
  errorCount: number;
  status: string;
  interval: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private websocketSubscription: Subscription;

  stationStatistics: StationStatistics[];
  faSettings = faCog;

  constructor(
    private modalService: NgbModal,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit(): void {
    this.websocketSubscription = this.websocketService.getMessages().subscribe((message: any) => {
      this.stationStatistics = JSON.parse(message);
    });
  }

  ngOnDestroy(): void {
    this.websocketSubscription.unsubscribe();
    this.websocketService.closeConnection();
  }

  openModal(stationStatistic): void {
    const modalRef = this.modalService.open(SettingsModalComponent, { size: 'xl', ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.stationStatistic = stationStatistic;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

}
