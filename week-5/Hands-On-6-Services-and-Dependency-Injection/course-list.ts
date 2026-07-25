import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  isLoading = false;

  courses: Course[] = [];

  selectedCourseId = 0;

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.courses = this.courseService.getCourses();

    this.isLoading = false;

  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  // trackBy improves performance by reusing existing DOM elements.
  trackByCourseId(index: number, course: any) {
    return course.id;
  }
}