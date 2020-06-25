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
class Tintucxoa extends React.Component {
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    this.xoa();

  }
  xoa() {
    let config1 = {
      method: "POST",
      body: JSON.stringify({
        idTin: this.props.chooseId,
      }),
    };
    fetch('http://apis.bav.edu.vn/smallgiving/trangquantri/admin/tintuc/delete.php', config1)
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
          Xóa tin tức
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              {' '}
              <p>Bạn có chắc chắn muốn xóa tin tức này ?</p>{' '}
            </CardBody>
            <Button color="danger" pill
              className="px-4 my-3"
              onClick={() => this.xoa()}
            >
              Xóa
            </Button>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
export default withSnackbar(Tintucxoa);
