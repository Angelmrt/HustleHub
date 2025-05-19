import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ref, push, set } from 'firebase/database';
import { db, auth} from '../../../firebase'; 
import { CategoriesService, CategoryIcon } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  eventForm!: FormGroup;
  categories: CategoryIcon[] = [];

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private categoriesService : CategoriesService
  ) {}


  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      eventDate: ['', Validators.required],
      image: [''],
      category: ['', Validators.required]
    });
  
    this.loadCategories();
  }
  
  private async loadCategories(): Promise<void> {
    this.categories = (await this.categoriesService.getCategoryIcons());
  }

  async onSubmit(): Promise<void> {
  if (this.eventForm.valid) {
    const formValue = this.eventForm.value;
    const categoryPath = `events/${formValue.category}/items`;
    const newRef = push(ref(db, categoryPath));

    const user = auth.currentUser;

    const eventData = {
      id: newRef.key,
      title: formValue.title,
      description: formValue.description,
      eventDate: formValue.eventDate,
      image: formValue.image || 'https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg',
      createdAt: new Date().toISOString(),
      createdBy: user?.uid || 'anonymous',
      creatorEmail: user?.email || 'unknown'
    };

    await set(newRef, eventData);
    this.activeModal.close();
  }
  
}
close() {
  this.activeModal.close();
}
}
