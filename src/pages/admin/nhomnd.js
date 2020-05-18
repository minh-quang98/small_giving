import Page from 'components/admin/Page';
import React from 'react';
import Nhomndthem from 'pages/admin/nhomndthem';
import Nhomndsua from 'pages/admin/nhomndsua';
import Nhomndxoa from 'pages/admin/nhomndxoa';
import { Card, CardBody, Col, Row, Table, Badge } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
const tableTypes = ['hover'];
class nhomnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modal_nested: false,
      showModalThem: false,
      showModalSua: false,
      showModalXoa: false,
      idNhom: "",

    };
  }
  componentDidUpdate(preProps, preState, future) {
    const { idNhom } = this.state;
    if (preState.idNhom != idNhom) {
      this.handleShowModalSua(idNhom);
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
      idNhom: id,
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
      idNhom: id,
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
    fetch('https://misappmobile.000webhostapp.com/trangquantri/shownhomnd.php')
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
  // toggle = modalType => () => {
  //   if (!modalType) {
  //     return this.setState({
  //       modal: !this.state.modal,
  //     });
  //   }

  //   this.setState({
  //     [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
  //   });
  // };
  render() {
    return (
      <Page
        className="ButtonPage"
        title="Nhóm người dùng"
        breadcrumbs={[
          { name: 'quản trị tài khoản' },
          { name: 'nhóm người dùng', active: true },
        ]}
      >
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardBody>
                  <Badge color="danger" pill className=" mb-3 p-2 can-click "
                    onClick={this.handleShowModalThem}>
                    + Thêm mới
                      </Badge>
                  <Nhomndthem
                    show={this.state.showModalThem}
                    onHide={this.handleCloseModalThem}
                    size="lg"
                    className={this.props.className}
                  />
                  <Table {...{ [tableType || 'hover']: true }}>
                    <thead>
                      <tr className="table-danger">

                        <th>Mã nhóm</th>
                        <th>Tên nhóm</th>
                        <th>Tác vụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((Item, index) => {
                        return (
                          <tr>
                            <td>{Item.idNhom}</td>
                            <td>{Item.TenNhom}</td>
                            <td>
                              <FaEdit className="can-click " size="1.5em"
                                onClick={() => this.handleShowModalSua(Item.idNhom)} />
                              <Nhomndsua
                                show={this.state.showModalSua}
                                onHide={this.handleCloseModalSua}
                                size="lg"
                                className={this.props.className}
                                chooseId={this.state.idNhom}
                              />
                              <MdDelete className="can-click" size="1.5em"
                                onClick={() => this.handleShowModalXoa(Item.idNhom)} />
                              <Nhomndxoa
                                show={this.state.showModalXoa}
                                onHide={this.handleCloseModalXoa}
                                size="lg"
                                className={this.props.className}
                                chooseId={this.state.idNhom}
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
export default nhomnd;