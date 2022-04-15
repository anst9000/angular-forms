import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;
  submitted = false;
  errorMessage = '';

  userModel = new User('Rob', 'rob@test.com', 1234567890, 'default', 'morning', true);

  constructor(private _enrollmentService: EnrollmentService) {}

  validateTopic(value: string) {
    if (value == 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit(userForm: any) {
    console.log(userForm)
    console.log(this.userModel);
    this.submitted = true;

    this._enrollmentService.enroll(this.userModel)
      .subscribe({
        next: (data) => console.log('Success!', data),
        error: (e) => {
          console.error('--> ERROR:', e);
          this.errorMessage = e.statusText;
        },
        complete: () => console.info('complete')
    });
  }
}
