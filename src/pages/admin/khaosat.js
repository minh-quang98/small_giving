import Page from 'components/admin/Page';
import Khaosatthem from 'pages/admin/khaosatthem';
import Khaosatsua from 'pages/admin/khaosatsua';
import Khaosatxoa from 'pages/admin/khaosatxoa';
import React from 'react';
import { Card, CardBody, Col, Row, Table, Badge, Button } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
const tableTypes = ['hover'];
const dataError = [
  {
    e1: "",
    e2: "",
    e3: "Chưa có dữ liệu",
    e4: "",
    e5: "",
    e6: "",

  }
]
class khaosat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataError: [],
      dataerror: false,
      showModalThem: false,
      showModalSua: false,
      showModalXoa: false,
      idKhaoSat: "",
      idKS: "hd_1590744148124"
    };
  }
  componentDidUpdate(preProps, preState, future) {
    const { idKhaoSat } = this.state;
    if (preState.idKhaoSat != idKhaoSat) {
      this.handleShowModalSua(idKhaoSat);
    }
    const { idKS } = this.state;
    if (preState.idKS != idKS) {
      this.handleShowModalXoa(idKS);
    }

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
  handleShowModalSua = id => {
    this.setState({
      showModalSua: true,
      idKhaoSat: id,
    });
  };
  handleCloseModalSua = () => {
    this.setState({
      showModalSua: false,
    });
  };
  handleShowModalXoa = id => {
    this.setState({
      showModalXoa: true,
      idKS: id,
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
    fetch('http://smallgiving.cf/mobileapp/trangquantri/showkhaosat.php')
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
  render() {
    return (
      <Page
        className="khaosat"
        title="Tạo khảo sát"
        breadcrumbs={[
          { name: 'quản trị hoạt động tài trợ' },
          { name: 'Tạo khảo sát', active: true },
        ]}
      >
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardBody>
                  <Khaosatthem
                    show={this.state.showModalThem}
                    onHide={this.handleCloseModalThem}
                    size="lg"
                    className={this.props.className}
                  />
                  <Khaosatsua
                    show={this.state.showModalSua}
                    onHide={this.handleCloseModalSua}
                    size="lg"
                    className={this.props.className}
                    chooseId={this.state.idKhaoSat}
                  />
                  <Khaosatxoa
                    show={this.state.showModalXoa}
                    onHide={this.handleCloseModalXoa}
                    size="lg"
                    className={this.props.className}
                    chooseId={this.state.idKS}
                  />

                  <Badge
                    color="danger"
                    pill
                    className=" mb-3 p-2 can-click"
                    onClick={this.handleShowModalThem}
                  >
                    + Thêm mới
                  </Badge>
                  <Table {...{ [tableType || 'hover']: true }}>
                    <thead>
                      <tr className="table-danger">
                        <th>ID</th>
                        <th>Tên khảo sát</th>
                        <th>Số dư</th>
                        <th>Số tiền mỗi lượt</th>
                        <th>CTV đăng tải</th>
                        <th>Sửa</th>
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
                              <td>
                                {Item.e6}
                              </td>
                            </tr>
                          );
                        }) : this.state.data.map(Item => {
                          return (
                            <tr>
                              <td>{Item.idKhaoSat}</td>
                              <td>{Item.TenKhaoSat}</td>

                              <td>
                                <Button
                                  color="link"
                                  className="can-click"
                                  onClick={() =>
                                    this.handleShowModalXoa(Item.idKhaoSat)
                                  }
                                > Xem
                                  </Button>
                              </td>
                              <td>{Item.SoTienML}</td>
                              <td>{Item.TenNguoiDung}</td>
                              <td>
                                <FaEdit
                                  className="can-click "
                                  size="1.5em"
                                  onClick={() =>
                                    this.handleShowModalSua(Item.idKhaoSat)
                                  }
                                />
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
export default khaosat;
