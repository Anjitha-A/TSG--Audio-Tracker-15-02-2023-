import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminListService } from './admin-list.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  constructor(private adminlistService: AdminListService, private _router: Router, private toastr: ToastrService) {}
  audios: any;
  trackid: any;
  ngOnInit(): void {
    this.adminlistService.getAudioList().subscribe((response: any) => {
      this.audios = response;
    });
  }
  delete(trackid: any) {
     alert("Are you sure want to delete this audio ..?")
    this.adminlistService.deleteAudio(trackid).subscribe((response: any) => {
      this.adminlistService.getAudioList().subscribe((response: any) => {
        this.audios = response;
        this.toastr.success("Audio deleted successfully");
      });
    });
  }
  edit(trackid: any) {
    this._router.navigate(['edit'], { queryParams: { id: trackid } });
  }
}
