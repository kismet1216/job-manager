export default class CardEntity {
  constructor() {
    this.id = null;
    this.company = '';
    this.position = '';
    this.resumeId = '';
    this.submittedUrl = '';
    this.date = '';
    this.index = 0;
    this.contact = {
      recruiter: '',
      phone: '',
      email: ''
    };
  }
}
