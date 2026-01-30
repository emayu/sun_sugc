import { Component, inject, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  private authService = inject(AuthService);

  loginForm = this.fb.group({
    correo: ['', isDevMode() ? [Validators.required] : [Validators.required, Validators.email] ],
    contrasena: ['', [Validators.required, Validators.minLength(4)]]
  });

  onLogin(){
    
    if (this.loginForm.invalid) return;

    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe({
      next: res => {
        this.snackBar.open('✅ ¡Bienvenido!', 'x', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: err =>{
        console.log('error recibido:', err);
        this.snackBar.open('Error: ' + err, 'x', { duration: 3000 });
      }
    });
    
  }

}
