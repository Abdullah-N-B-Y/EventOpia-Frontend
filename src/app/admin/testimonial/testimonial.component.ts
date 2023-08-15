import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from '../../services/testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  testimonialForm: FormGroup = this.fb.group({});
  
  constructor(
    private fb: FormBuilder,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.testimonialForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.testimonialForm.valid) {
      const userId = localStorage.getItem('userId');

      if (userId !== null) {
        const testimonial = {
          content: this.testimonialForm.value.content,
          creationDate: new Date(),
          status: 'Pending',
          userId: parseInt(userId) // Convert userId to a number
        };

        this.testimonialService.createTestimonial(testimonial).subscribe(() => {
          this.testimonialForm.reset();
          // Optionally, show a success message to the user
        });
      } else {
        console.error('User ID not found in local storage');
      }
    }
  }
}
