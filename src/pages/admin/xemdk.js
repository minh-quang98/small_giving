import Page from 'components/Page';
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

class Xemdk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    fetch('https://misappmobile.000webhostapp.com/trangquantri/shownd.php')
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            data: data,
          },
          () => console.log('kiemtradulieu', this.state.data),
        );
      });
  };
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
                            <th>Mã đăng kí</th>
                            <th>Tên người tham gia</th>
                            <th> SĐT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map(Item => {
                            return (
                              <tr>
                                <td>{Item.idNguoiDung}</td>
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
