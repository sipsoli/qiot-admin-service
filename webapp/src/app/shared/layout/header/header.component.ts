import { Component, OnInit } from '@angular/core';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {SettingsModalComponent} from '../../../dashboard/settings-modal/settings-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  faSettings = faCog;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openModal(): void {
    const modalRef = this.modalService.open(SettingsModalComponent, { size: 'xl', ariaLabelledBy: 'modal-basic-title'});
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

}
