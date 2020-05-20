import Page from 'components/Page';
import Diemdanhthem from 'pages/admin/diemdanhthem';
import Diemdanhsua from 'pages/admin/diemdanhsua';
import Diemdanhxoa from 'pages/admin/diemdanhxoa';
import React from 'react';
import { Card, CardBody, Col, Row, Table, Badge } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
const tableTypes = ['hover'];
const dataError = [
  {
    e1: "",
    e2: "Chưa có dữ liệu",
    e3: "",
    e4: "",
    e5: "",
    e6: "",
  }
]
class diemdanh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataError: [],
      dataerror: false,
      showModalThem: false,
      showModalSua: false,
      showModalXoa: false,
      idDiemDanh: "",
    };
  }
  componentDidUpdate(preProps, preState, future) {
    const { idDiemDanh } = this.state;
    if (preState.idDiemDanh != idDiemDanh) {
      this.handleShowModalSua(idDiemDanh);
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
  handleShowModalSua = id => {
    this.setState({
      showModalSua: true,
      idDiemDanh: id,
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
      idDiemDanh: id,
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
      'http://smallgiving.cf/mobileapp/trangquantri/showdiemdanh.php',
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
        className="diemdanh"
        title="Tạo điểm danh"
        breadcrumbs={[
          { name: 'quản trị hoạt động tài trợ' },
          { name: 'Tạo điểm danh', active: true },
        ]}
      >
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardBody>
                  <Diemdanhthem
                    show={this.state.showModalThem}
                    onHide={this.handleCloseModalThem}
                    size="lg"
                    className={this.props.className}
                  />
                  <Diemdanhsua
                    show={this.state.showModalSua}
                    onHide={this.handleCloseModalSua}
                    size="lg"
                    className={this.props.className}
                    chooseId={this.state.idDiemDanh}
                  />
                  <Diemdanhxoa
                    show={this.state.showModalXoa}
                    onHide={this.handleCloseModalXoa}
                    size="lg"
                    className={this.props.className}
                    chooseId={this.state.idDiemDanh}
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
                        <th>Tên quỹ điểm danh</th>

                        <th>Số người tham gia</th>
                        <th>Sô tiền mỗi lượt</th>
                        <th>CTV tạo quỹ</th>
                        <th></th>
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
                              <td>{Item.idDiemDanh}</td>
                              <td>{Item.TenDiemDanh}</td>

                              <td>{Item.SoNguoiTG}</td>
                              <td>{Item.SoTienML}</td>
                              <td>{Item.TenNguoiDung}</td>
                              <td>
                                <FaEdit
                                  className="can-click "
                                  size="1.5em"
                                  onClick={() =>
                                    this.handleShowModalSua(Item.idDiemDanh)
                                  }
                                />
                                <MdDelete
                                  className="can-click"
                                  size="1.5em"
                                  onClick={() =>
                                    this.handleShowModalSua(Item.idDiemDanh)
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
export default diemdanh;
