import Page from 'components/admin/Page';
import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
const tableTypes = ['hover'];
const dataError = [
  {
    id: "",
    TenNguoiDung: " Chưa có dữ liệu",
    SDT: "",
  }
]

class Xemdk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataError: [],
      dataerror: false,
    };
  }
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    this.getdatashow();

  }

  getdatashow() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idHoatDong: this.props.chooseId,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/hoatdong/xemdangky.php', config)
      .then(response => response.json())
      .then(data => {
        if (data.message === "No post found") {
          this.setState({ dataerror: true, dataError: dataError });
        } else {
          this.setState(
            {
              dataerror: false,
              data: data,
            },
            () => console.log('kiemtradulieu', this.state.data),
          );

        }

      });
  }
  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Xem đăng ký
        </ModalHeader>
        <ModalBody>
          <Page>
            {tableTypes.map((tableType, index) => (
              <Row key={index}>
                <Col>
                  <Card className="mb-3">
                    <CardBody>
                      <Table {...{ [tableType || 'hover']: true }}>
                        <thead>
                          <tr className="table-danger">
                            <th>ID</th>
                            <th>Tên Nhà hảo tâm</th>
                            <th>SĐT liên hệ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.dataerror ?
                            this.state.dataError.map(Item => {
                              return (
                                <tr>
                                  <td>{Item.id}</td>
                                  <td>{Item.TenNguoiDung}</td>
                                  <td>{Item.SDT}</td>
                                </tr>
                              );
                            }) : this.state.data.map(Item => {
                              return (
                                <tr>
                                  <td>{Item.idDangKy}</td>
                                  <td>{Item.TenNguoiDung}</td>
                                  <td>{Item.SDT}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ))}
          </Page>
        </ModalBody>
      </Modal>
    );
  }
}
export default Xemdk;
