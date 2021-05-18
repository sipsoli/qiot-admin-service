import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {AdminService} from '../../core/services/admin.service';
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import {StationStatistics} from '../dashboard.component';

@Component({
  selector: 'app-dashboard-settings-modal',
  templateUrl: './settings-modal.component.html'
})
export class SettingsModalComponent implements OnInit, OnDestroy {

  faPlay = faPlay;
  faPause = faPause;

  @Input() stationStatistic: StationStatistics;
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter();

  private playSubscription: Subscription;
  private resumeSubscription: Subscription;

  constructor(
    private adminService: AdminService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.stationStatistic);
  }

  ngOnDestroy(): void {
    if (this.playSubscription){
      this.playSubscription.unsubscribe();
    }
    if (this.resumeSubscription){
      this.resumeSubscription.unsubscribe();
    }
  }

  closeModal(data): void {
    this.activeModal.close(data);
  }

  public resumeGas(): void {
    if (this.stationStatistic){
      const stationId = this.stationStatistic.station.id;
      this.playSubscription = this.adminService.resumeGasCollector(stationId).subscribe((data: any) => {
        this.activeModal.close(data);
      });
    } else {
      this.playSubscription = this.adminService.resumeAllGasCollectors().subscribe((data: any) => {
        this.activeModal.close(data);
      });
    }
  }

  public pauseGas(): void {
    if (this.stationStatistic) {
      const stationId = this.stationStatistic.station.id;
      this.resumeSubscription = this.adminService.pauseGasCollector(stationId).subscribe((data: any) => {
        this.activeModal.close(data);
      });
    } else {
      this.resumeSubscription = this.adminService.pauseAllGasCollectors().subscribe((data: any) => {
        this.activeModal.close(data);
      });
    }
  }

  public changeGasInterval(formData: any): void {
    if (this.stationStatistic){
      const stationId = this.stationStatistic.station.id;
      this.resumeSubscription = this.adminService.updateIntervalGasCollector(stationId, formData.gasInterval).subscribe((data: any) => {
        this.activeModal.close(data);
      });
    } else {
      this.resumeSubscription = this.adminService.updateIntervalAllGasCollectors(formData.gasInterval).subscribe((data: any) => {
        this.activeModal.close(data);
      });
    }
  }

  public resumePollution(): void {
    if (this.stationStatistic) {
      const stationId = this.stationStatistic.station.id;
      this.playSubscription = this.adminService.resumePollutionCollector(stationId).subscribe((data: any) => {
        this.activeModal.close(data);
      });
    } else {
      this.playSubscription = this.adminService.resumeAllPollutionCollectors().subscribe((data: any) => {
        this.activeModal.close(data);
      });
    }
  }

  public pausePollution(): void {
    if (this.stationStatistic) {
      const stationId = this.stationStatistic.station.id;
      this.resumeSubscription = this.adminService.pausePollutionCollector(stationId).subscribe((data: any) => {
        this.activeModal.close(data);
      });
    } else {
      this.resumeSubscription = this.adminService.pauseAllPollutionCollectors().subscribe((data: any) => {
        this.activeModal.close(data);
      });
    }
  }

  public changePollutionInterval(formData: any): void {
    if (this.stationStatistic) {
      const stationId = this.stationStatistic.station.id;
      this.resumeSubscription = this.adminService.updateIntervalPollutionCollector(stationId, formData.pollutionInterval).subscribe((data: any) => {
        this.activeModal.close(data);
      });
    } else {
      this.resumeSubscription = this.adminService.updateIntervalAllPollutionCollectors(formData.pollutionInterval).subscribe((data: any) => {
        this.activeModal.close(data);
      });
    }
  }

}
