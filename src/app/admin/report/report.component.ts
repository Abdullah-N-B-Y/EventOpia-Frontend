import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/report.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  monthlyBenefits: number = 0;
  annualBenefits: number = 0;
  reportFetched: boolean = false;

  benefitsData: any[] = [];
  benefitsLabels: string[] = ['Monthly', 'Annual'];
  benefitsChartType: ChartType = 'bar';

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    this.fetchBenefitsReport(startDate, endDate);
  }

  fetchBenefitsReport(startDate: Date, endDate: Date): void {
    this.statisticsService
      .getBenefitsReport(startDate, endDate)
      .subscribe((data: any) => {
        this.monthlyBenefits = data.monthlyBenefits;
        this.annualBenefits = data.annualBenefits;

        this.reportFetched = true;
        this.benefitsData = [
          {
            data: [this.monthlyBenefits, this.annualBenefits],
            label: 'Benefits',
          },
        ];
      });
  }
}
