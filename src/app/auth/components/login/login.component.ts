import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, IGithubProfile } from '@app/auth/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  public githubUser!: IGithubProfile;

  constructor(private fb: FormBuilder, private matSnackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.authService.authValidator('username')]],
      password: ['', [Validators.required, this.authService.authValidator('password')]]
    })
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        if (res) {
          this.matSnackBar.open('Login Successful', '', { duration: 2000 });
          this.githubUser = res;
        } else {
          this.matSnackBar.open('Login Failed', '', { duration: 2000 });
        }
      }
    )
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }
}
