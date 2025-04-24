import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('modalHost') modalHost!: GenericModalComponent;



  constructor(private modalService: NgbModal ) { }

  ngOnInit(): void {
  }
  openmodal() {
    this.modalService.open(LoginComponent, {
      centered: true, // opcional
      size: 'md',     // 'sm' | 'md' | 'lg' | 'xl'
      backdrop: true, 
      keyboard: true,
      windowClass:'no-border-modal'
    });
  }


}
