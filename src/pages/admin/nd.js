import Page from 'components/admin/Page';
import React from 'react';
import Nguoidungthem from 'pages/admin/ndthem';
import Nguoidungsua from 'pages/admin/ndsua';
import Nguoidungxoa from 'pages/admin/ndxoa';
import { Card, CardBody, Col, Row, Table, Badge } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const tableTypes = ['hover'];
class nd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showModalThem: false,
      showModalSua: false,
      showModalXoa: false,
      idNguoiDung: "",
    };
  }
  componentDidUpdate(preProps, preState, future) {
    const { idNguoiDung } = this.state;
    if (preState.idNguoiDung != idNguoiDung) {
      this.handleShowModalSua(idNguoiDung);
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
      idNguoiDung: id,
      showModalSua: true,
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
      idNguoiDung: id,
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
    fetch('http://smallgiving.cf/mobileapp/trangquantri/shownd.php')
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
        className="nd"
        title="Người dùng"
        breadcrumbs={[
          { name: 'quản trị tài khoản' },
          { name: 'người dùng', active: true },
        ]}
      >
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardBody>

                  <Table {...{ [tableType || 'hover']: true }}>
                    <thead>
                      <tr className="table-danger">
                        <th>ID</th>
                        <th>Tên người dùng</th>
                        <th>SĐT</th>
                        <th>Email</th>
                        <th>Mật khẩu</th>
                        <th>Huy hiệu</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((Item, index) => (
                        <tr>
                          <td>{Item.idNguoiDung}</td>
                          <td>{Item.TenNguoiDung}</td>
                          <td>{Item.SDT}</td>
                          <td>{Item.Email}</td>
                          <td>{Item.MatKhau}</td>
                          <td>{Item.HuyHieu}</td>
                          <td>
                            <FaEdit className="can-click" size="1.5em"
                              onClick={() => this.handleShowModalSua(Item.idNguoiDung)}
                            />
                            <Nguoidungsua
                              show={this.state.showModalSua}
                              onHide={() => this.handleCloseModalSua()}
                              size="lg"
                              className={this.props.className}
                              chooseId={this.state.idNguoiDung}
                            />

                            <Nguoidungxoa
                              show={this.state.showModalXoa}
                              onHide={() => this.handleCloseModalXoa()}
                              size="lg"
                              className={this.props.className}
                              chooseId={this.state.idNguoiDung}
                            />

                          </td>
                        </tr>
                      )
                      )}
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
export default nd;

