import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { doCardAction } from '../../../../redux/actions/do-card.action';
import { connect } from 'react-redux';
import http from '../../../../shared/services/http';
/*
* props: {
*   info: {
*     card: any,
*     pid: string
*   },
*   onClose() => {}
* }
* */
class EditCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // if no company setup when opening modal, meaning isNew
      isNew: !this.props.info.card.company
    };

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values, actions) {
    const api = this.state.isNew ? `/card/addTo/${this.props.info.pid}` : '/card/edit';
    http.post(api, values).then(procedure => {
      this.props.setProcedure(procedure);
      actions.setSubmitting(false);
      this.props.onClose();
    });
  }

  render() {
    return (
      <Formik initialValues={this.props.info.card} onSubmit={this.submitForm} render={({errors, status, touched, isSubmitting}) => (
        <Form>
          <div className="form-group row">
            <label className="col-2 col-form-label">公司</label>
            <div className="col-6">
              <Field type="text" name="company" className="form-control" />
              <ErrorMessage name="company" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">职位</label>
            <div className="col-6">
              <Field type="text" name="position" className="form-control" />
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
              <Field type="date" name="date" className="form-control" />
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
  setProcedure: (procedure) => dispatch(doCardAction(procedure))
});

export default connect(
  null,
  mapDispatchToProps
)(EditCard);
