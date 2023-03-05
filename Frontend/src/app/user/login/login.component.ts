import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  mensajeError: string = '';


  constructor(private usersService: UsersService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

  }

  async onSubmit(): Promise<any> {


    const response = await this.usersService.login(this.form.value);

    // * Comprobamos errores

    if (response.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error en usuario y/o contraseña',
      })
    } else {
      localStorage.setItem('token', response.token);
      Swal.fire({
        title: 'Login Correcto',
        text: 'Bienvenido a SPRENCIA',
        icon: 'success',
        confirmButtonText: '¡Ok!'
      })
    }
    if (response.token) {
      this.router.navigate(['/home'])
    }

  }

}
