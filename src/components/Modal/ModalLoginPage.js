import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import AuthForm, { STATE_LOGIN } from '../AuthForm';

class ModalLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleLogin = () => {
    this.setState({
      showLogin: !this.props.showLogin,
    });
  };

  handleAuthState = authState => {
    this.setState({
      authState: STATE_LOGIN,
    });
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.show}
          toggle={this.handleLogin}
          // onHideModal: {this.props.onHide}
          size="sm"
          backdrop="static"
          backdropClassName="modal-backdrop-light"
          // external={externalCloseBtn}
          centered>
          <ModalBody>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogin={() => {
                this.setState({ showLogin: false })}}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalLoginPage;
