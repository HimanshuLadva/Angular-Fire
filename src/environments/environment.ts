// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    apiKey: "AIzaSyBxjrCv1HrfMcfhqvHqE5Ab5k3Kf0nt0mM",
    authDomain: "angularfire-course-8e149.firebaseapp.com",
    projectId: "angularfire-course-8e149",
    storageBucket: "angularfire-course-8e149.appspot.com",
    messagingSenderId: "710129699504",
    appId: "1:710129699504:web:daa287db0ca09c58610975"
  },
  api: {

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
