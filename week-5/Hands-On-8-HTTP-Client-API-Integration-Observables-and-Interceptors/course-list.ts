import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';
import { Student } from '../../models/student.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseCard
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  isLoading = true;

  courses: Course[] = [];

  students: Student[] = [];

  errorMessage = '';

  selectedCourseId = 0;

  searchTerm = '';


  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.searchTerm =
      this.route.snapshot.queryParamMap.get('search') || '';

    this.courseService.getCourses().subscribe({

      next: (courses) => {

        this.courses = courses;
        this.isLoading = false;
        this.cdr.detectChanges();

      },

      error: (err) => {

        this.errorMessage = err.message;
        this.isLoading = false;
        this.cdr.detectChanges();

      }

    });

  }

  onEnroll(courseId: number): void {

    this.selectedCourseId = courseId;

    of(courseId)
    .pipe(
      // switchMap cancels the previous HTTP request
      // if a new course is selected before it finishes.
      switchMap(id =>
        this.enrollmentService.getStudentsByCourse(id.toString())
      )

    )
    .subscribe({

      next: (students) => {

        this.students = students;

        console.log('Students:', students);
        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

      }

    });

}

  viewCourse(courseId: number): void {

    this.router.navigate([
      'courses',
      courseId
    ]);

  }

  updateSearch(): void {

    this.router.navigate(
      ['courses'],
      {
        queryParams: {
          search: this.searchTerm
        }
      }
    );

  }

  trackByCourseId(index: number, course: Course): number {

    return course.id;

  }
  updateFirstCourse() {

  const updatedCourse: Course = 
  {
    id: 1,
    name: 'Angular Advanced',
    code: 'ANG101',
    credits: 5,
    gradeStatus: 'passed'
  };

  this.courseService.updateCourse(1, updatedCourse).subscribe({

    next: (course) => {
      console.log('Course Updated:', course);
      alert('Course updated successfully!');
    },

    error: (err) => {
      console.error(err);
    }

  });

}
deleteFirstCourse() {

  this.courseService.deleteCourse(1).subscribe({

    next: () => {
      console.log('Course Deleted');
      alert('Course deleted successfully!');
    },

    error: (err) => {
      console.error(err);
    }

  });

}


}