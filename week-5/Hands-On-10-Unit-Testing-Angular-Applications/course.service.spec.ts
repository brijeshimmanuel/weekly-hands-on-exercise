import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import { CourseService } from './course.service';
import { authInterceptor } from '../interceptors/auth-interceptor';
import { errorHandlerInterceptor } from '../interceptors/error-handler-interceptor';
import { loadingInterceptor } from '../interceptors/loading-interceptor';

describe('CourseService', () => {

  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CourseService,

        provideHttpClient(
          withInterceptors([
            authInterceptor,
            errorHandlerInterceptor,
            loadingInterceptor
          ])
        ),

        provideHttpClientTesting()

      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

  it('should return all courses', () => {

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

    service.getCourses().subscribe(courses => {

      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);

    });

    const req = httpMock.expectOne(
      'http://localhost:3000/courses'
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockCourses);

  });

  it('should handle HTTP error', () => {

    service.getCourses().subscribe({

      next: () => {
        throw new Error('Expected an error, but got success.');
      },

      error: (err) => {

        expect(err.message).toBe(
          'Failed to load courses. Please try again.'
        );

      }

    });

    // First request
    let req = httpMock.expectOne(
      'http://localhost:3000/courses'
    );

    expect(req.request.method).toBe('GET');

    req.flush(
      'Server Error',
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );

    // Retry 1
    req = httpMock.expectOne(
      'http://localhost:3000/courses'
    );

    req.flush(
      'Server Error',
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );

    // Retry 2
    req = httpMock.expectOne(
      'http://localhost:3000/courses'
    );

    req.flush(
      'Server Error',
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );

  });

});