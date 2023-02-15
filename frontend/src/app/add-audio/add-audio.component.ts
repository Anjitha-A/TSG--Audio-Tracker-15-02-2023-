import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddAudioService } from './add-audio.service';

@Component({
  selector: 'app-add-audio',
  templateUrl: './add-audio.component.html',
  styleUrls: ['./add-audio.component.scss'],
})
export class AddAudioComponent implements OnInit {
  addForm!: FormGroup;
  category: any;
  constructor(private addAudioService: AddAudioService, private formBuilder: FormBuilder, private _router: Router,private toastr: ToastrService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.addAudioService.getCategory().subscribe((response: any) => {
      this.category = response;
    });
  }
  add() {
    if (this.addForm.valid) {
      const reqObj = {
        title: this.addForm.value.title,
        artist: this.addForm.value.artist,
        category_id: this.addForm.value.category,
        album: this.addForm.value.album,
      };
      

      this.addAudioService.addAudio(reqObj).subscribe((response: any) => {
        
        this.toastr.success("Audio added successfully");
        this._router.navigate(['/adminlist']);
      });
    }
  }
  private createForm() {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      artist: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      category: ['', Validators.required],
      album: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    });
  }
}
