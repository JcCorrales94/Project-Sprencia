import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup

  constructor(private usersService: UsersService, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)])
    });
  };

  async onSubmit() {
    const response = await this.usersService.register(this.form.value)
    if (response.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.error,
      })
    }
    if (response.affectedRows >= 1) {
      Swal.fire({
        title: 'Registro correcto',
        text: ' Bienvenido a Sprencia',
        icon: 'success',
        confirmButtonText: '¡Ok!'
      })
      this.router.navigate(['/login'])
    }
  }
};
