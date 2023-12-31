import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {finalize, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CourseService } from '../service/course.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  loading = false;
  course:Course;
  lessons: Lesson[];
  lastPageLoaded = 0;

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(private route: ActivatedRoute, private courseService: CourseService) {

  }

  ngOnInit() {
    this.loading = true;
     this.course = this.route.snapshot.data['course'];
     this.courseService.findLessons(this.course.id)
     .pipe(
       finalize(() => this.loading = false)
     )
     .subscribe(lessons => this.lessons = lessons);
  }

  loadMore() {
     this.lastPageLoaded++;
     this.loading = true;
     this.courseService.findLessons(this.course.id, 'asc', this.lastPageLoaded)
     .pipe(
       finalize(() => this.loading = false)
     )
     .subscribe(lessons => this.lessons = this.lessons.concat(lessons));
  }

}
