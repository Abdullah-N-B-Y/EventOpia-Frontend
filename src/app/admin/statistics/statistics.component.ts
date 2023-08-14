import { Component, OnInit} from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {

  statistics: any = {};

  constructor(private  statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics() {
    this.statisticsService.getStatistics().subscribe(
      (res: any) => {
        this.statistics = res;
        console.log(this.statistics);
      },
      (err) => {
        console.log(err.status);
      }
    );
  }
}