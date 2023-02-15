import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditService } from './edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  category: any;
  editForm!: FormGroup;
  values: any;
  response: any;
  audios: any;

  constructor(
    private editService: EditService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const trackid = this.route.snapshot.queryParamMap.get('id');   
    this.editService.getOneAudio(trackid).subscribe((response: any) => {
      this.editService.getCategory().subscribe((response: any) => {       
        this.category = response;
      });    
      this.editForm = new FormGroup({
        title: new FormControl(response.title),
        artist: new FormControl(response.artist),
        category: new FormControl(response.category),
        album: new FormControl(response.album),
      });
      
    });
  }
  edit() {
    const trackid = this.route.snapshot.queryParamMap.get('id');
    const reqObj = {
      title: this.editForm.value.title,
      artist: this.editForm.value.artist,
      category_id: this.editForm.value.category,
      album: this.editForm.value.album,
    };
    this.editService.updateAudio(trackid, reqObj).subscribe((response: any) => {
      this.editService.getAudioList().subscribe((response: any) => {
        this.audios = response;
        this.toastr.success("Audio updated successfully");
        this._router.navigate(['/adminlist']);
      });
    });
  }
}
