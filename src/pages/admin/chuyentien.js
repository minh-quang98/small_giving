import Page from 'components/Page';
import Chuyentienthem from 'pages/admin/chuyentienthem';
import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
const tableTypes = ['hover'];
class chuyentien extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showModalThem: false,
    };
  }
  handleShowModalThem = () => {
    this.setState({
      showModalThem: true,
    });
  };
  handleCloseModalThem = () => {
    this.setState({
      showModalThem: false,
    });
  };
  componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    fetch(
      'https://misappmobile.000webhostapp.com/trangquantri/showchuyentien.php',
    )
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
  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  render() {
    return (
      <Page
        className="chuyentien"
        title="Khảo sát"
        breadcrumbs={[
          { name: 'quản trị giao dịch' },
          { name: 'Khảo sát', active: true },
        ]}
      >
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardBody>

                  <Table {...{ [tableType || 'default']: true }}>
                    <thead>
                      <tr className="table-danger">
                        <th>Mã giao dịch</th>
                        <th> Tài khoản nguồn</th>
                        <th>Tài khoản đích</th>
                        <th>Thời gian</th>
                        <th>Số tiền</th>
                        <th>Tác vụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map(Item => {
                        return (
                          <tr>
                            <td>{Item.idGiaoDich}</td>
                            <td>{Item.TenKhaoSat}</td>
                            <td>{Item.TenNguoiDung}</td>
                            <td>{Item.ThoiGian}</td>
                            <td>{Item.SoTien}</td>
                            <td>
                              <Chuyentienthem
                                show={this.state.showModalThem}
                                onHide={this.handleCloseModalThem}
                                size="lg"
                                className={this.props.className}
                              />
                              <Badge
                                color="danger"
                                pill
                                className=" mb-3 p-2 can-click oke"
                              //onClick={this.handleShowModalThem}
                              >
                                Chấp nhận
                              </Badge>
                              <Chuyentienthem
                                show={this.state.showModalThem}
                                onHide={this.handleCloseModalThem}
                                size="lg"
                                className={this.props.className}
                              />
                              <Badge
                                color="danger"
                                pill
                                className=" mb-3 p-2 can-click"
                              //onClick={this.handleShowModalThem}
                              >
                                Hủy bỏ
                              </Badge>

                            </td>
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
    );
  }
}
export default chuyentien;
