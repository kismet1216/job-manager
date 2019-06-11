import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { doCardAction } from '../../../../redux/actions/do-card.action';
import { connect } from 'react-redux';
/*
* props: {
*   info: {
*     card: any,
*     pid: string
*   }
* }
* */
class EditCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNew: !this.props.info.card.dest
    };

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values, actions) {
    this.props.onSubmit(values, this.props.info.pid, this.state.isNew);
    actions.setSubmitting(false);
  }

  render() {
    return (
      <Formik initialValues={this.props.info.card} onSubmit={this.submitForm} render={({errors, status, touched, isSubmitting}) => (
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

const mapDispatchToProps = dispatch => ({
  onSubmit: (card, pid, isNew) => dispatch(doCardAction(card, pid, isNew))
});

export default connect(
  null,
  mapDispatchToProps
)(EditCard);
