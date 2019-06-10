import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

/*
* props: {
*   card: any
* }
* */
export default class EditCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNew: !this.props.card.dest
    };

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values, actions) {
    this.props.onSubmit(values, this.state.isNew);
    actions.setSubmitting(false);
  }

  render() {
    return (
      <Formik initialValues={this.props.card} onSubmit={this.submitForm} render={({errors, status, touched, isSubmitting}) => (
        <Form>
          <div className="form-group row">
            <label className="col-2 col-form-label">公司</label>
            <div className="col-6">
              <Field type="text" name="dest" className="form-control" />
              <ErrorMessage name="dest" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">职位</label>
            <div className="col-6">
              <Field type="text" name="pos" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">投递网站</label>
            <div className="col-6">
              <Field type="text" name="submittedUrl" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">简历</label>
            <div className="col-6">
              <Field type="text" name="resume" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">投递时间</label>
            <div className="col-6">
              <Field type="text" name="date" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">猎头</label>
            <div className="col-6">
              <Field type="text" name="contact.recruiter" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">电话</label>
            <div className="col-6">
              <Field type="tel" name="contact.phone" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">email</label>
            <div className="col-6">
              <Field type="email" name="contact.email" className="form-control" />
            </div>
          </div>

          <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
            保存
          </button>
        </Form>
      )} />
    );
  }
}
