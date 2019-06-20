export default class CardEntity {
  constructor() {
    this.id = null;
    this.company = '';
    this.position = '';
    this.resume = '';
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
