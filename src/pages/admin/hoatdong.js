import Page from 'components/Page';
import Xemdk from 'pages/admin/xemdk';
import React from 'react';
import Hoatdongthem from 'pages/admin/hoatdongthem';
import Hoatdongsua from 'pages/admin/hoatdongsua';
import Hoatdongxoa from 'pages/admin/hoatdongxoa';
import { Card, CardBody, Col, Row, Table, Badge, Button } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
const tableTypes = ['hover'];
const dataError = [
  {
    e1: "",
    e2: "",
    e3: "",
    e4: "Chưa có dữ liệu",
    e5: "",
    e6: "",
    e7: "",
    e8: "",

  }
]
class hoatdong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataerror: false,
      dataError: [],
      showModalThem: false,
      showModalSua: false,
      showModalXoa: false,
      showModalXem: false,
      idHoatDong: "",
      idHD: "",
    };
  }
  componentDidUpdate(preProps, preState, future) {
    const { idHoatDong } = this.state;
    if (preState.idHoatDong != idHoatDong) {
      this.handleShowModalSua(idHoatDong);
      // this.handleShowModalXem(idHoatDong);
    }
    const { idHD } = this.state;
    if (preState.idHD != idHD) {
      //this.handleShowModalSua(idHoatDong);
      this.handleShowModalXem(idHD);
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
  handleShowModalSua = (id) => {
    this.setState({
      showModalSua: true,
      idHoatDong: id,
    });
  };
  handleCloseModalSua = () => {
    this.setState({
      showModalSua: false,
    });
  };
  handleShowModalXoa = (id) => {
    this.setState({
      showModalXoa: true,
      idHoatDong: id,
    });
  };
  handleCloseModalXoa = () => {
    this.setState({
      showModalXoa: false,
    });
  };
  handleShowModalXem = (id) => {
    this.setState({
      showModalXem: true,
      idHD: id,
    });
  };
  handleCloseModalXem = () => {
    this.setState({
      showModalXem: false,
    });
  };
  componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    fetch(
      'http://smallgiving.cf/mobileapp/trangquantri/showhoatdong.php',
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
  render() {
    return (
      <Page
        className="hoatdong"
        title="Danh sách hoạt động"
        breadcrumbs={[
          { name: 'quản trị hoạt động tình nguyện' },
          { name: 'danh sách hoat động', active: true },
        ]}
      >
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardBody>
                  <Hoatdongthem
                    show={this.state.showModalThem}
                    onHide={() => this.handleCloseModalThem()}
                    size="lg"
                    className={this.props.className}
                  />
                  <Hoatdongsua
                    show={this.state.showModalSua}
                    onHide={() => this.handleCloseModalSua()}
                    size="lg"
                    className={this.props.className}
                    chooseId={this.state.idHoatDong}
                  />
                  <Hoatdongxoa
                    show={this.state.showModalXoa}
                    onHide={() => this.handleCloseModalXoa()}
                    size="lg"
                    className={this.props.className}
                    chooseId={this.state.idHoatDong}
                  />
                  <Xemdk
                    show={this.state.showModalXem}
                    onHide={() => this.handleCloseModalXem()}
                    size="lg"
                    className={this.props.className}
                    chooseId={this.state.idHD}
                  />

                  <Badge
                    color="danger"
                    pill
                    className=" mb-3 p-2 can-click"
                    onClick={() => this.handleShowModalThem()}
                  >
                    + Thêm mới
                  </Badge>
                  <Table {...{ [tableType || 'hover']: true }}>
                    <thead>
                      <tr className="table-danger ">
                        <th>ID</th>
                        <th> Tên hoạt động</th>
                        <th> Bắt đầu</th>
                        <th> Kết thúc</th>
                        <th> Lượt quyên góp</th>
                        <th> CTV đăng tải</th>
                        <th> Xem đăng kí</th>
                        <th> </th>
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
                              <td>{Item.e6}</td>
                              <td>
                                {Item.e7}
                              </td>
                              <td>
                                {Item.e8}

                              </td>
                            </tr>
                          );
                        }) : this.state.data.map(Item => {
                          return (
                            <tr>
                              <td>{Item.idHoatDong}</td>
                              <td>{Item.TenHoatDong}</td>
                              <td>{Item.ThoiGianBD}</td>
                              <td>{Item.ThoiGianKT}</td>

                              <td>{Item.SoNguoiTG}</td>
                              <td>{Item.TenNguoiDung}</td>
                              <td>
                                <Button
                                  color="link"
                                  className="can-click"
                                  onClick={() => this.handleShowModalXem(Item.idHoatDong)}
                                >
                                  Xem
                              </Button>
                              </td>
                              <td>
                                <FaEdit
                                  className="can-click "
                                  size="1.5em"

                                  onClick={() => this.handleShowModalSua(Item.idHoatDong)}
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
export default hoatdong;