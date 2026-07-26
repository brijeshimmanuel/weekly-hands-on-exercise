import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment.service';
import { Student } from '../../models/student.model';
import { Store } from '@ngrx/store';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-course-card',
  standalone: true,
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

  @Input() students: Student[] = [];

  @Input() selected = false;

  @Output()
  enrollRequested = new EventEmitter<number>();

  @Output()
  viewRequested = new EventEmitter<number>();

  isExpanded = false;

  enrolledIds$!: Observable<number[]>;

  constructor(
    private store: Store,
    public enrollmentService: EnrollmentService
  ) {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  enroll(): void {

    this.enrolledIds$
      .pipe(take(1))
      .subscribe(ids => {

        if (ids.includes(this.course.id)) {

          this.store.dispatch(
            EnrollmentActions.unenrollFromCourse({
              courseId: this.course.id
            })
          );

        } else {

          this.store.dispatch(
            EnrollmentActions.enrollInCourse({
              courseId: this.course.id
            })
          );

        }

        this.enrollRequested.emit(this.course.id);

      });

  }

  toggleDetails(): void {

    this.isExpanded = !this.isExpanded;
    this.viewRequested.emit(this.course.id);

  }

  get cardClasses() {

    return {
      'card--enrolled': this.enrollmentService.isEnrolled(this.course.id),
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };

  }

}