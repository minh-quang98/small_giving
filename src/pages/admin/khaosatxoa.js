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
class Khaosatxoa extends React.Component {
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    //this.deleteData();
  }


  deleteData() {
    let config3 = {
      method: "POST",
      body: JSON.stringify({
        idGiaoDich: this.props.chooseId,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/thuchienkhaosat/delete.php', config3)
      .then(response => response.json())
      .then((datashow) => {
        if (datashow.message === "success") {
          this.props.enqueueSnackbar('Thành công!', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
          window.location.reload();

        } else {
        }
      });
  }
  handleSubmit = event => {
    event.preventDefault();
    //const isValid = this.validate();
    //if (isValid) {
    console.log(this.state);
    //clear form
    // this.setState(initialState);
    //}
  };
  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Hủy bỏ giao dịch
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <Card >
              <CardBody>
                {' '}
                <p>Bạn có chắc chắn muốn hủy giao dịch này?</p>{' '}
              </CardBody>
              <Button color="danger" pill
                className="px-4 my-3"
                onClick={() => this.deleteData()}
              >
                Hủy
            </Button>
            </Card>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
export default withSnackbar(Khaosatxoa);
