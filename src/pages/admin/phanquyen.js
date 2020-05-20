import Page from 'components/Page';
import React from 'react';
import {
  Button,
  CardSubtitle,
  Card,
  CardBody,
  Col,
  Row,
  Table,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap';

const tableTypes = ['striped'];
class phanquyen extends React.Component {
  state = {
    rSelected: null,
    cSelected: [],
    aSelected: 'Chọn đối tượng',
  };

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }

  render() {
    return (
      <Page
        title="Phân quyền"
        breadcrumbs={[{ name: 'Phân quyền', active: true }]}
        className="TablePage"
      >
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardBody>
                  <Row>
                    <Col>
                      <UncontrolledButtonDropdown>
                        <DropdownToggle caret>
                          {this.state.aSelected}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() =>
                              this.setState({ aSelected: 'Phụ trách CLB' })
                            }
                            active={this.state.aSelected === 'Phụ trách CLB'}
                          >
                            Phụ trách CLB
                          </DropdownItem>
                          <DropdownItem
                            onClick={() =>
                              this.setState({
                                aSelected: 'Cộng tác viên viết bài',
                              })
                            }
                            active={
                              this.state.rSelected === 'Cộng tác viên viết bài'
                            }
                          >
                            Cộng tác viên viết bài
                          </DropdownItem>
                          <DropdownItem
                            onClick={() =>
                              this.setState({
                                aSelected: 'Cộng tác viên kế toán',
                              })
                            }
                            active={
                              this.state.rSelected === 'Cộng tác viên kế toán'
                            }
                          >
                            Cộng tác viên kế toán
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </Col>
                  </Row>
                  <Table {...{ [tableType || 'default']: true }}>
                    <Row>
                      <Col md={8}>
                        <Card>
                          <CardBody>
                            <Table {...{ [tableType || 'default']: true }}>
                              <thead></thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <CardSubtitle>Phân quyền</CardSubtitle>
                                    <Button
                                      color="primary"
                                      onClick={() => this.onCheckboxBtnClick(1)}
                                      active={this.state.cSelected.includes(1)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Phân quyền
                                    <br />
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <CardSubtitle>
                                      Quản trị tài khoản
                                    </CardSubtitle>
                                    <Button
                                      color="primary"
                                      onClick={() => this.onCheckboxBtnClick(2)}
                                      active={this.state.cSelected.includes(2)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Nhóm người dùng
                                    <br />
                                    <Button
                                      color="primary"
                                      onClick={() => this.onCheckboxBtnClick(3)}
                                      active={this.state.cSelected.includes(3)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Người dùng <br />
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <CardSubtitle>
                                      Quản trị hoạt động thiện nguyện
                                    </CardSubtitle>
                                    <Button
                                      color="primary"
                                      onClick={() => this.onCheckboxBtnClick(4)}
                                      active={this.state.cSelected.includes(4)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Danh sách hoạt động
                                    <br />
                                    <Button
                                      color="primary"
                                      onClick={() => this.onCheckboxBtnClick(5)}
                                      active={this.state.cSelected.includes(5)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Tin hoạt động
                                    <br />
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <CardSubtitle>
                                      Quản trị hoạt động tài trợ
                                    </CardSubtitle>
                                    <Button
                                      color="primary"
                                      onClick={() => this.onCheckboxBtnClick(6)}
                                      active={this.state.cSelected.includes(6)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Danh sách khảo sát
                                    <br />
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <CardSubtitle>
                                      Quản trị luồng quyên góp
                                    </CardSubtitle>
                                    <Button
                                      color="primary"
                                      onClick={() => this.onCheckboxBtnClick(7)}
                                      active={this.state.cSelected.includes(7)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Nạp tiền
                                    <br />
                                    <Button
                                      color="primary"
                                      onClick={() => this.onCheckboxBtnClick(8)}
                                      active={this.state.cSelected.includes(8)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Chuyển tiền
                                    <br />
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <CardSubtitle>Quản trị góp ý</CardSubtitle>
                                    <Button
                                      color="primary"
                                      onClick={() => this.onCheckboxBtnClick(9)}
                                      active={this.state.cSelected.includes(9)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Quản trị góp ý <br />
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <CardSubtitle>Báo cáo</CardSubtitle>
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        this.onCheckboxBtnClick(10)
                                      }
                                      active={this.state.cSelected.includes(10)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Nạp tiền
                                    <br />
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        this.onCheckboxBtnClick(11)
                                      }
                                      active={this.state.cSelected.includes(11)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Khảo sát
                                    <br />
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        this.onCheckboxBtnClick(12)
                                      }
                                      active={this.state.cSelected.includes(12)}
                                    >
                                      {' '}
                                    </Button>{' '}
                                    Quyên góp
                                    <br />
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
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
export default phanquyen;
