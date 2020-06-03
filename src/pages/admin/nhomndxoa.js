import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { withSnackbar } from 'notistack';
class Nhomndxoa extends React.Component {
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    this.xoa();

  }
  xoa() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idGiaoDich: this.props.chooseId,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/thuchienkhaosat/delete.php', config)
      .then(response => response.json())
      .then(data => {
        if (data.message === "success") {


          window.location.reload();

        } else {


        }
      });

  }
  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Hủy giao dịch
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody> <p>Bạn có chắc chắn muốn hủy bỏ giao dịch này ? </p> </CardBody>
            <Button color="danger" pill
              className="px-4 my-3"
              onClick={() => this.xoa()}
            >
              Hủy
        </Button></Card>
        </ModalBody>
      </Modal>
    );
  }
}
export default withSnackbar(Nhomndxoa);
