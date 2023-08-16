import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { TestimonialService } from '../../services/testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  testimonialForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.testimonialForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(500)]],
      status: ['Pending', Validators.required],
      userId: [parseInt(localStorage.getItem('UserId') as string, 10)]
    });
  }

  onSubmit(): void {
    if (this.testimonialForm.valid) {
      const testimonialData = this.testimonialForm.value;
      testimonialData.creationDate = new Date();
      this.testimonialService.createTestimonial(testimonialData).subscribe(
        response => {
          console.log('Testimonial created:', response);
          this.toastr.success('Testimonial created successfully!');
          this.testimonialForm.reset();
        },
        error => {
          console.error('Error creating testimonial:', error);
          this.toastr.error('Error creating testimonial.');
        }
      );
    }
  }
}