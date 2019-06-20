import React from 'react';
import { connect } from 'react-redux';
import { PROCEDURE_ADD } from '../../../constants';
import http from '../../../shared/services/http';

/**
 * props: {
 *  addProcedure: () => {}
 * }
 */
class AddProcedure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowInput: false,
      title: ''
    };

    this.showInput = this.showInput.bind(this);
    this.addProcedure = this.addProcedure.bind(this);
    this.inputTitle = this.inputTitle.bind(this)
  }

  showInput() {
    this.setState({ isShowInput: true });
  }

  addProcedure() {
    http.post('/procedures/add', {title: this.state.title}).then(procedure => {
      this.props.addProcedure(procedure);
    });

    this.setState({
      isShowInput: false,
      title: ''
    });
  }

  inputTitle(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    return (
      <div>
        {this.state.isShowInput ?
          <div>
            <input className="form-control" type="text" value={this.state.title} onChange={this.inputTitle} />
            <button className="btn btn-outline-success mt-1" onClick={this.addProcedure}>Add</button>
          </div> :
          <button className="btn btn-outline-primary" onClick={this.showInput}><i className="fa fa-plus" /> Add a new procedure</button>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProcedure: (title) => dispatch({ type: PROCEDURE_ADD, payload: title })
});

export default connect(
  null,
  mapDispatchToProps
)(AddProcedure);