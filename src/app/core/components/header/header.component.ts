import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('LoginModal', { static: true }) loginModal : TemplateRef<any> | null = null;
  public modalRef: NgbModalRef | null = null;


  constructor(private modalservice : NgbModal , ) { }

  ngOnInit(): void {
  }

  openmodal(){
    this.modalRef = this.modalservice.open(this.loginModal, { size: 'lg', backdrop: 'static' });

  }

}
