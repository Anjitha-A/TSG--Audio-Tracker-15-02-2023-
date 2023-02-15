import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '../authentication.service';
import { CredentialsService } from '../credentials.service';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  
  errTrue: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private _credentialService: CredentialsService,
    private _router: Router,
    private toastr: ToastrService
  ) {
    this.createForm();
  }
  ngOnInit() {}
  login() {
    
    if (this.loginForm.valid) {
      this.isLoading = true;  
      const reqObj = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      }
      this.authenticationService.login(reqObj).subscribe(
        (response: any) => {
          this.isLoading = false;              
              this._credentialService.setCredentials(response);        
              if (response.usertype == 1) {
              this._router.navigate(['/home']);
              }
              if (response.usertype == 2) {
              this._router.navigate(['/userhome']);
              }
              this.toastr.success("Login successfull");             
        },
        (error: any) => {
          this.isLoading = false;
          // this.errTrue = true;
          this.toastr.error(error.error.error)         
          log.error('error occured', error);
        }
      );
    }
  }
  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      password: ['', Validators.required],
      // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    });
  }
}
