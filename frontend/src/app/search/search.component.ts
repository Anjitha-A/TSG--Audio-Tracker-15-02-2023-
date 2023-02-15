import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  audios: any;

  constructor(private searchService: SearchService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    // const search_value  = this.router.snapshot.queryParamMap.get('search_value')
    // console.log("search value",search_value)
    // this.searchService.searchAudio(search_value).subscribe(
    //   (response:any)=>{
    //     console.log("after",response)
    //     this.audios = response
    //   }
    // )
  }
}
