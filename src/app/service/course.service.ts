import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { map } from 'rxjs/operators';
import { convertSnaps } from './dn.utils';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(private db: AngularFirestore) { }

  loadCourseByCategory(category: string): Observable<Course[]> {
      return this.db.collection('courses', ref => ref.where('categories', 'array-contains', category).orderBy('seqNo'))
      .get()
      .pipe(
        map(result => convertSnaps<Course>(result))
      );
  }
}
