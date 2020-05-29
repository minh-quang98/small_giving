import Page from 'components/Page';
import Chuyentienthem from 'pages/admin/chuyentienthem';
import KhaoSatXoa from 'pages/admin/khaosatxoa'
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
const dataError = [
  {
    e1: "",
    e2: "Chưa có dữ liệu",
    e3: "",
    e4: "",
    e5: "",
  }
]
class chuyentien extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      disabled: false,
      dataError: [],
      dataerror: false,
      showModalThem: false,
      showModalXoa: false,
      idGiaoDich: "",
      idGD: ""
    };
  }
  componentDidUpdate(preProps, preState, future) {
    const { idGiaoDich } = this.state;
    if (preState.idGiaoDich != idGiaoDich) {

      this.handleShowModalXoa(idGiaoDich);
      // this.handleShowModalXem(idHoatDong);
    }
    const { idGD } = this.state;
    if (preState.idGD != idGD) {
      //this.handleShowModalSua(idHoatDong);
      this.handleShowModalThem(idGD);
    }

  }
  handleShowModalThem = id => {
    if (this.state.disabled) {
      this.setState({
        showModalThem: true,
        idGD: id,
      });
    }
    this.setState({ disabled: true });
  };
  handleCloseModalThem = () => {
    this.setState({
      showModalThem: false,
    });
  };
  handleShowModalXoa = id => {
    this.setState({
      showModalXoa: true,
      idGiaoDich: id,
    });
  };
  handleCloseModalXoa = () => {
    this.setState({
      showModalXoa: false,
    });
  };
  componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    fetch(
      'http://smallgiving.cf/mobileapp/trangquantri/showchuyentien.php',
    )
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
                        <th>ID</th>
                        <th> Tài khoản nguồn</th>
                        <th>Tài khoản đích</th>

                        <th>Số tiền</th>
                        <th>Tác vụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.dataerror ?
                        this.state.dataError.map(Item => {
                          return (
                            <tr>
                              <td>{Item.e1}</td>
                              <td>{Item.e2}</td>
                              <td>{Item.e3}</td>

                              <td>{Item.e4}</td>
                              <td>{Item.e5}</td>
                            </tr>
                          );
                        }) : this.state.data.map(Item => {
                          return (
                            <tr>
                              <td>{Item.idGiaoDich}</td>
                              <td>{Item.TenKhaoSat}</td>
                              <td>{Item.Email}</td>

                              <td>{Item.SoTien}</td>
                              <td>
                                <Chuyentienthem
                                  show={this.state.showModalThem}
                                  onHide={this.handleCloseModalThem}
                                  size="lg"
                                  className={this.props.className}
                                  chooseId={this.state.idGD}
                                />
                                <Badge
                                  color="danger"
                                  pill
                                  className=" mb-3 p-2 can-click oke"
                                  onClick={() => this.handleShowModalThem(Item.idGiaoDich)}
                                  disabled={this.state.disabled}
                                >
                                  Chấp nhận
                              </Badge>
                                <KhaoSatXoa
                                  show={this.state.showModalXoa}
                                  onHide={this.handleCloseModalXoa}
                                  size="lg"
                                  className={this.props.className}
                                  chooseId={this.state.idGiaoDich}
                                />
                                <Badge
                                  color="danger"
                                  pill
                                  className=" mb-3 p-2 can-click"
                                  onClick={() =>
                                    this.handleShowModalXoa(Item.idGiaoDich)
                                  }
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
