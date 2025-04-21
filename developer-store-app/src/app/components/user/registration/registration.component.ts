import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { CreateUserRequest } from '../../../models/create-user.request';
import { UserService } from '../../../services/user.service.';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';

@Component({
  selector: 'app-registration',
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  form: FormGroup;


  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private userService: UserService,  
    private dialog: MatDialog) 
    {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  register(): void {
    if (this.form.valid) {
      
      const user: CreateUserRequest = this.form.value;

      this.userService.register(user).subscribe({
        next: (res) => {
          this.dialog.open(SuccessDialogComponent, {
            data:{ title: 'Success', message: 'User created successfully'
            }
          }).afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          })
        },
        error:(e => {
          console.error("Error on create user", e)
        })
      });
    }
  }
}
