import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
@Component({
  selector: 'app-course-card',
  imports: [
    CommonModule,
    Highlight,
    CreditLabelPipe
  ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {

  @Input() course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus: string;
  };

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  isEnrolled = false;

  enroll() {
    this.isEnrolled = true;
    this.enrollRequested.emit(this.course.id);
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  // Getter keeps the template clean by moving class logic into TypeScript.
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

}