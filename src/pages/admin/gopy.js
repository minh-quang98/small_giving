import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';

const tableTypes = ['hover'];
class gopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    fetch('https://misappmobile.000webhostapp.com/trangquantri/showgopy.php')
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
  render() {
    return (
      <Page
        className="gopy"
        title="Quản trị góp ý"
        breadcrumbs={[{ name: 'quản trị góp ý', active: true }]}
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
                        <th> SĐT</th>
                        <th>Email</th>
                        <th>Nội dung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map(Item => {
                        return (
                          <tr>
                            <td>{Item.idGopY}</td>
                            <td>{Item.TenNguoiDung}</td>
                            <td>{Item.SDT}</td>
                            <td>{Item.Email}</td>
                            <td>{Item.NoiDung}</td>
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
export default gopy;
