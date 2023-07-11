import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import { CourseService } from '../service/course.service';
import { UserService } from '../service/user.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private router: Router, private courseService:CourseService, public userService: UserService) {}

    ngOnInit() {
      this.reloadCourses();
    }

  reloadCourses() {
    this.beginnersCourses$ = this.courseService.loadCourseByCategory("BEGINNER");
    this.advancedCourses$ = this.courseService.loadCourseByCategory("ADVANCED");
  }

}
