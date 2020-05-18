import React from 'react';
import {Button, Card, CardBody,Modal, ModalBody,Input, ModalHeader, Label} from 'reactstrap';

class Nguoidungxoa extends React.Component {
  /*constructor(props) {
    super(props);
    this.state ={
      
      delete: []
    }
  }*/
  
  handleDelete () {
    let config = {
      method: "DELETE",
    };
    fetch(`https://misappmobile.000webhostapp.com/trangquantri/admin/nguoidung/delete.php?idNguoiDung=` + this.props.chooseId , config)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          console.log("Xóa thành công", config);
          this.setState({
            showModalXoa: false,
          })
        } else {
          console.log("Thất bại");
        }
      });
  }
  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Xóa người dùng
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody> <p>Bạn có chắc chắn muốn xóa mã người dùng này ?</p> 
                </CardBody>
              <Button color="danger" pill 
              className="px-4 my-3" 
              onClick={() => this.handleDelete()}
              >  Xóa  </Button>
              
          </Card>          
        </ModalBody>
      </Modal>
    );
  }
}
export default Nguoidungxoa;
