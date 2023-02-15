import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '../authentication.service';
import { CredentialsService } from '../credentials.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  registerForm!: FormGroup;
  isLoading = false;
  register_response: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private _credentialService: CredentialsService,
    private _router: Router,
    private toastr: ToastrService
  ) {
    this.createForm();
  }
  ngOnInit(): void {}
  register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const reqObj = {
        fullname: this.registerForm.value.fullname,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };
      this.authenticationService.register(reqObj).subscribe(
        (response: any) => {
          this.isLoading = false;
          if(response.error){
            this.toastr.error(response.error)
          }
          else{
            this.toastr.success("Registration successfull, you can login now..!!");
            this._router.navigate(['/login']);
 
          }
            
        },
        (error: any) => {
          this.isLoading = false;
          //  this.errTrue = true
          this.toastr.error(error.error);
        }
      );
    }
  }
  private createForm() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      username: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      password: ['', Validators.required],
      // remember: true,
    });
  }




}
