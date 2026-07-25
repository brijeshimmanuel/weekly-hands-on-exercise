import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { Notification } from '../../components/notification/notification';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    CourseSummaryWidget,
    Notification
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  // String Interpolation
  portalName = 'Student Course Portal';

  // Property Binding
  isPortalActive = true;

  // Event Binding
  message = '';

  // Two-Way Binding
  searchTerm = '';

  // Lifecycle Hook data
  availableCourses = 0;

  courseCount = 0;

  constructor(
    private courseService: CourseService
  ) {}

  // ngOnInit
  ngOnInit(): void {
    this.availableCourses = 12;
    console.log('HomeComponent initialised — courses loaded');
    this.courseCount = this.courseService.getCourses().length;
  }

  // ngOnDestroy
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }
}