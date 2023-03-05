import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs'
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  mensajeError: string = '';
  hasError: Boolean

  constructor(private usersService: UsersService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
    this.hasError = false;
  }

  async onSubmit(): Promise<any> {
    this.hasError = false;

    const response = await this.usersService.login(this.form.value);

    // * Comprobamos errores

    console.log(response);

  }

}
