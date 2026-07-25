import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  isLoading = false;

  courses = [
  {
    id: 1,
    name: 'Angular',
    code: 'ANG101',
    credits: 1,
    gradeStatus: 'passed'
  },
  {
    id: 2,
    name: 'Java',
    code: 'JAVA201',
    credits: 3,
    gradeStatus: 'failed'
  },
  {
    id: 3,
    name: 'Spring Boot',
    code: 'SPR301',
    credits: 4,
    gradeStatus: 'pending'
  },
  {
    id: 4,
    name: 'SQL',
    code: 'SQL101',
    credits: 3,
    gradeStatus: 'passed'
  },
  {
    id: 5,
    name: 'AWS',
    code: 'AWS401',
    credits: 2,
    gradeStatus: 'pending'
  }
];

  selectedCourseId = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
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