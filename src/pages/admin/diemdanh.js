import Page from 'components/Page';
import Diemdanhthem from 'pages/admin/diemdanhthem';
import Diemdanhsua from 'pages/admin/diemdanhsua';
import Diemdanhxoa from 'pages/admin/diemdanhxoa';
import React from 'react';
import { Card, CardBody, Col, Row, Table, Badge, Button } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
const tableTypes = ['hover'];
const dataError = [
  {
    e1: "",
    e2: "Chưa có dữ liệu",
    e3: "",
    e4: "",
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
      idDD: "hd_1590744148124"
    };
  }
  componentDidUpdate(preProps, preState, future) {
    const { idDiemDanh } = this.state;
    if (preState.idDiemDanh != idDiemDanh) {
      this.handleShowModalSua(idDiemDanh);
      // this.handleShowModalXem(idHoatDong);
    }
    const { idDD } = this.state;
    if (preState.idDD != idDD) {
      this.handleShowModalXoa(idDD);
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
      idDD: id,
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
      'http://apis.bav.edu.vn/smallgiving/trangquantri/showdiemdanh.php',
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
                <CardBody className="fix-scoll">

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
                    chooseId={this.state.idDD}
                  />

                  <Table {...{ [tableType || 'hover']: true }}>
                    <thead>
                      <tr className="table-danger">
                        <th>ID</th>
                        <th>Sô tiền mỗi lượt</th>
                        <th>Số dư</th>
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
                              <td>
                                {Item.e4}
                              </td>
                            </tr>
                          );
                        }) : this.state.data.map(Item => {
                          return (
                            <tr>
                              <td>{Item.idDiemDanh}</td>
                              <td>{Item.SoTienML}</td>
                              <td><Button
                                color="link"
                                className="can-click"
                                onClick={() =>
                                  this.handleShowModalXoa(Item.idDiemDanh)
                                }
                              > Xem
                                  </Button>
                              </td>
                              <td>
                                <FaEdit
                                  className="can-click "
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
