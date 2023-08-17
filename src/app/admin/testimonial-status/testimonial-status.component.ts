import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TestimonialService } from '../../services/testimonial.service';

@Component({
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-status.component.html',
  styleUrls: ['./testimonial-status.component.css'],
})
export class TestimonialStatusComponent implements OnInit {
  approvedTestimonials: any[] = [];
  rejectedTestimonials: any[] = [];
  pendingTestimonials: any[] = [];

  constructor(
    private testimonialService: TestimonialService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchTestimonials();
  }

  fetchTestimonials(): void {
    this.testimonialService.GetAllTestimonials().subscribe(
      (response: any[]) => {
        this.approvedTestimonials = response.filter(
          (t) => t.status === 'Approved'
        );
        this.rejectedTestimonials = response.filter(
          (t) => t.status === 'Rejected'
        );
        this.pendingTestimonials = response.filter(
          (t) => t.status === 'Pending'
        );
      },
      (error) => {
        console.error('Error fetching testimonials:', error);
      }
    );
  }

  changeStatus(testimonial: any, newStatus: string): void {
    testimonial.status = newStatus;
    this.testimonialService.UpdateTestimonial(testimonial).subscribe(
      (response) => {
        this.toastr.success(`Testimonial status updated to ${newStatus}`);
      },
      (error) => {
        console.error('Error updating testimonial status:', error);
        this.toastr.error('Error updating testimonial status.');
      }
    );
  }
}
