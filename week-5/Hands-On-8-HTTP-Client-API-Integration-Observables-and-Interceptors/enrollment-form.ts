import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {

  studentName = '';

  studentEmail = '';

  courseId: number | null = null;

  preferredSemester = '';

  agreeToTerms = false;

  submitted = false;
  constructor(
    private courseService: CourseService
  ) {}

  onSubmit(form: NgForm) {

  if (form.invalid) {
    return;
  }

  const newCourse = {
    name: this.studentName,
    code: 'NEW101',
    credits: 4,
    gradeStatus: 'pending' as const
  };

  this.courseService.createCourse(newCourse).subscribe({

    next: (course) => {

      console.log('Course created:', course);

      alert('Course created successfully!');

      this.submitted = true;

    },

    error: (err) => {

      console.error(err);

      alert('Failed to create course.');

    }

  });

}

  resetForm(form: NgForm) {

    form.resetForm();

    this.submitted = false;

  }

}