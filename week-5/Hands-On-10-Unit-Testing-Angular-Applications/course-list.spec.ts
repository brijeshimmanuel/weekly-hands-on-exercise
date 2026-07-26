import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CourseList } from './course-list';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';

describe('CourseList', () => {

  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses = [
    {
      id: 1,
      name: 'Angular',
      code: 'ANG101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      name: 'Java',
      code: 'JAVA201',
      credits: 3,
      gradeStatus: 'failed'
    }
  ];

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [

        provideMockStore({
          initialState: {
            course: {
              courses: mockCourses,
              loading: false,
              error: null
            },
            enrollment: {
              enrolledCourseIds: []
            }
          }
        }),

        provideRouter([]),

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => ''
              }
            }
          }
        },

        {
          provide: CourseService,
          useValue: {
            getCourses: () => of(mockCourses)
          }
        },

        {
          provide: EnrollmentService,
          useValue: {
            getStudentsByCourse: () => of([]),
            isEnrolled: () => false,
            enroll: () => {},
            unenroll: () => {}
          }
        }

      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should render course cards', () => {

    const cards = fixture.debugElement.queryAll(
      By.css('app-course-card')
    );

    expect(cards.length).toBe(2);

  });

});