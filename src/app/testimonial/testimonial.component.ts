import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TestimonialService } from '../services/testimonial.service';
import { Testimonial } from '../shared/Data/Testimonial';

@Component({
    selector: 'app-testimonial',
    templateUrl: './testimonial.component.html',
    styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
    testimonialForm!: FormGroup;
    approvedTestimonials: Testimonial[] = [];

    constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private testimonialService: TestimonialService) {}
    @Input() displayTemplate: boolean = true;

    ngOnInit(): void {
        this.testimonialForm = this.formBuilder.group({
            content: ['', [Validators.required, Validators.maxLength(500)]],
            status: ['Pending', Validators.required],
            userId: [parseInt(localStorage.getItem('UserId') as string, 10)],
        });
        this.fetchTestimonials();
    }

    fetchTestimonials(): void {
        this.testimonialService.GetAllTestimonials().subscribe(
            (response: Testimonial[]) => {
                this.approvedTestimonials = response.filter((t) => t.status === 'Approved');
            },
            (error) => {
                console.error('Error fetching testimonials:', error);
            }
        );
    }

    onSubmit(): void {
        if (this.testimonialForm.valid) {
            const testimonialData = this.testimonialForm.value;
            testimonialData.creationDate = new Date();
            this.testimonialService.createTestimonial(testimonialData).subscribe(
                (response) => {
                    console.log('Testimonial created:', response);
                    this.toastr.success('Testimonial created successfully!');
                },
                (error) => {
                    console.error('Error creating testimonial:', error);
                    this.toastr.error('Error creating testimonial.');
                }
            );
        }
    }
}
