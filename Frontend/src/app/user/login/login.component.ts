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
  form!: FormGroup;
  mensajeError: string = '';

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.usersService.login(this.form.value).pipe(
      catchError((e) => {
        // * código si hay error
        this.mensajeError = e.error.error
        return EMPTY;
      })
    ).subscribe(datos => {
      // * Código si todo ha ido bien
      localStorage.setItem('token', datos.token);
      this.router.navigate(['/home'])
    })
  }
}
