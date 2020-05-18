import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
class Diemdanhxoa extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Xóa tài khoản điểm danh
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              {' '}
              <p>Bạn có chắc chắn muốn xóa tài khoản này ?</p>{' '}
            </CardBody>
            <Button color="danger" pill className="px-4 my-3">
              Xóa
            </Button>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
export default Diemdanhxoa;
