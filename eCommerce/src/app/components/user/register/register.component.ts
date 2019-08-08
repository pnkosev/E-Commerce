import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  registerSub: Subscription;
  phoneCodes: string[] = ['+359', '+33', '+01'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-z]{1,10}$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-z]{1,10}$/)]],
      code: ['+33', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^^(0)[1-9](\d{2}){4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^\w{6,15}$/)]],
      repeatPassword: ['', [Validators.required, Validators.pattern(/^\w{6,15}$/)]]
    });
  }

  register() {
    if (this.form.valid) {
      this.registerSub = this.userService.register(this.form.value).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  get email(): AbstractControl {
    return this.form.controls.email;
  }

  get firstName(): AbstractControl {
    return this.form.controls.firstName;
  }

  get lastName(): AbstractControl {
    return this.form.controls.lastName;
  }

  get phoneNumber(): AbstractControl {
    return this.form.controls.phoneNumber;
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get repeatPassword(): AbstractControl {
    return this.form.get('repeatPassword');
  }

  ngOnDestroy() {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }
}
