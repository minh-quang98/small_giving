import Page from 'components/admin/Page';
import React from 'react';
import Tintucthem from 'pages/admin/tintucthem';
import Tintucsua from 'pages/admin/tintucsua';
import Tintucxoa from 'pages/admin/tintucxoa';
import { Card, CardBody, Col, Row, Table, Badge } from 'reactstrap';
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
  }
]
class tintuc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataError: [],
      dataerror: false,
      showModalThem: false,
      showModalSua: false,
      showModalXoa: false,
      idTin: "",
    };
  }
  componentDidUpdate(preProps, preState, future) {
    const { idTin } = this.state;
    if (preState.idTin != idTin) {
      this.handleShowModalSua(idTin);
      // this.handleShowModalXem(idHoatDong);
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
      idTin: id,
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
      idTin: id,
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
    fetch('http://smallgiving.cf/mobileapp/trangquantri/showtintuc.php')
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
        className="tintuc"
        title="Tin tức"
        breadcrumbs={[
          { name: 'quản trị hoạt động tình nguyện' },
          { name: 'Tin tức', active: true },
        ]}
      >
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardBody>
                  <Tintucthem
                    show={this.state.showModalThem}
                    onHide={() => this.handleCloseModalThem()}
                    size="lg"
                    className={this.props.className}
                  />
                  <Tintucsua
                    show={this.state.showModalSua}
                    onHide={() => this.handleCloseModalSua()}
                    size="lg"
                    className={this.props.className}
                    chooseId={this.state.idTin}
                  />
                  <Tintucxoa
                    show={this.state.showModalXoa}
                    onHide={() => this.handleCloseModalXoa()}
                    size="lg"
                    className={this.props.className}
                    chooseId={this.state.idTin}
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
                        <th> ID</th>
                        <th> Tiêu đề tin tức</th>
                        <th> Tiêu đề thông báo</th>
                        <th> CTV đăng tải</th>
                        <th> Tác vụ</th>
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
                              <td>
                                {Item.e5}
                              </td>
                            </tr>
                          );
                        }) : this.state.data.map(Item => {
                          return (
                            <tr>
                              <td>{Item.idTin}</td>
                              <td>{Item.TenTin}</td>
                              <td>{Item.TieuDeThongBao}</td>
                              <td>{Item.TenNguoiDung}</td>
                              <td>
                                <FaEdit
                                  className="can-click "
                                  size="1.5em"
                                  onClick={() =>
                                    this.handleShowModalSua(Item.idTin)
                                  }

                                />

                                <MdDelete
                                  className="can-click"
                                  size="1.5em"

                                  onClick={() => this.handleShowModalXoa(Item.idTin)}
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
export default tintuc;