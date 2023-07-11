import { Component } from "@angular/core";
import "firebase/firestore";
import { AngularFirestore } from "@angular/fire/firestore";
import { COURSES, findLessonsForCourse } from "./db-data";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})

export class AboutComponent {
  constructor(private db: AngularFirestore) {}
  
  async uploadData() {
    const coursesCollection = this.db.collection("courses");
    const courses = await this.db.collection("courses").get();
    for (let course of Object.values(COURSES)) {
      const newCourse = this.removeId(course);
      const courseRef = await coursesCollection.add(newCourse);
      const lessons = await courseRef.collection("lessons");
      const courseLessons = findLessonsForCourse(course["id"]);
      console.log(`Uploading course ${course["description"]}`);
      for (const lesson of courseLessons) {
        const newLesson = this.removeId(lesson);
        delete newLesson.courseId;
        await lessons.add(newLesson);
      }
    }
  }
  
  removeId(data: any) {
    const newData: any = { ...data };
    delete newData.id;
    return newData;
  }
  
  onReadDoc() {
    // for getting realtime data 
    this.db.doc("/courses/0rz13MlL7L80n28wh6Gn").snapshotChanges().subscribe((snap) => {
        console.log(snap.payload.id);
        console.log(snap.payload.data());
    });

    /* this.db
    .doc("/courses/0rz13MlL7L80n28wh6Gn")
    .get()
      .subscribe((snap) => {
        console.log(snap.id);
        console.log(snap.data());
      }); */
    }
    
    onReadColleciton() {
      this.db
      .collection("courses", (ref) =>
      ref.where("seqNo", "<=", 7)
      .where("lessonsCount", "==", 10)
      .orderBy("seqNo")
      )
      .get()
      .subscribe((snap) => {
        snap.forEach((doc) => {
          console.log(doc.id);
          console.log(doc.data());
        });
      });
      /* this.db
      .collection("/courses/DinZvnaz06JBk74Si9UF/lessons" ,ref => ref.where("seqNo", "<=",5).orderBy("seqNo"))
      .get()
      .subscribe((snap) => {
        snap.forEach((doc) => {
          console.log(doc.id);
          console.log(doc.data());
        });
      }); */
    /* this.db
    .collection("courses")
    .get()
    .subscribe((snap) => {
      snap.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
      });
    }); */
  }

  onReadCollecitonGroup() {
     this.db.collectionGroup("lessons", ref => ref.where("seqNo", "==", 1))
     .get()
     .subscribe((snap) => {
      snap.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
      });
    });
  }

  ngOnDestroy(): void {
  
  }
}
