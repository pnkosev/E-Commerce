import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ItemService } from './../../../core/services/item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  imagesCount = 1;
  createItemSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      price: [null, [Validators.required, Validators.min(1), Validators.max(10000)]],
      images: this.fb.array(
        new Array(this.imagesCount).fill(null).map((_) => (this.fb.group({
          imageURL: ['', [Validators.required, this.validateImageURL]]
        })))
      )
    });
  }

  validateImageURL(frm: FormControl) {
    return (frm.value.length === 0 && !frm.touched)
      || ((frm.value.startsWith('http') || frm.value.startsWith('https'))
        && (frm.value.endsWith('png') || frm.value.endsWith('jpg') || frm.value.endsWith('jpeg')))
      ? null : { invalidURL: true };
  }

  create() {
    console.log(this.form);
    if (this.form.valid) {
      this.createItemSub = this.itemService.createItem(this.form.value).subscribe(() => {
        // this.router.navigate(['/home']);
      });
    }
  }

  addImage() {
    const currentFormValue = this.form.value;
    this.imagesCount++;
    this.buildForm();
    this.form.patchValue(currentFormValue);
  }

  get title(): AbstractControl {
    return this.form.controls.title;
  }

  get description(): AbstractControl {
    return this.form.controls.description;
  }

  get price(): AbstractControl {
    return this.form.controls.price;
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  get imageURL() {
    return this.images.controls;
  }

  ngOnDestroy() {
    if (this.createItemSub) {
      this.createItemSub.unsubscribe();
    }
  }
}
