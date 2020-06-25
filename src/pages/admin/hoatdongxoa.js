import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
const initialState = {
  sodu: "",
  name: "",
};
class Hoatdongxoa extends React.Component {
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
    fetch(`http://apis.bav.edu.vn/smallgiving/apiway4/laythongtin.php`, configg)
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
          Số dư hoạt động "{this.state.name}"
        </ModalHeader>
        <ModalBody >
          <Card>
            <CardBody>
              <p style={{ textAlign: "center" }}>{this.state.sodu}</p>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
export default Hoatdongxoa;
