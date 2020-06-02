import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
} from 'reactstrap';
import { withSnackbar } from 'notistack';
const initialState = {
  sodu: "",
  name: "",
};
class Khaosatxoa extends React.Component {
  state = initialState;
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    this.getsodu();

  }
  getsodu = async () => {
    let configg = {
      method: "POST",
      body: JSON.stringify({
        ClientNumber: this.props.chooseId,
      })
    }
    fetch(`https://misappmobile.000webhostapp.com/apiway4/laythongtin.php`, configg)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          name: data.ContractName,
          sodu: data.Available,
        }, () => console.log("check>>>", this.state.sodu))
      });

  }
  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Số dư khảo sát "{this.state.name}"
        </ModalHeader>
        <ModalBody>
          <Form>
            <Card >
              <CardBody>
                <p style={{ textAlign: "center" }}>{this.state.sodu}</p>
              </CardBody>
            </Card>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
export default withSnackbar(Khaosatxoa);
