import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Col, Row, Media
} from 'reactstrap';

import Page from 'components/Page';



class NewsPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    // let {fakeData, activeIndex} = this.state
    return (
      <Page title="Tin tức" >
        <Row>
          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
                <CardTitle style={{fontSize: 25}}>Sự kiện người già neo đơn</CardTitle>
                <CardSubtitle>12/02/2020</CardSubtitle>
                <CardText>Nhưng người gia không nơi nương tựa</CardText>
              </CardBody>
              <Media
                object
                src='img/News/NGND.jpg'
                style={{ width: '100%', height: '100%' }}
              />
              <CardBody>
                <CardLink href="#">Chi tiết</CardLink>
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
                <CardTitle style={{fontSize: 25}}>Trẻ em mồ côi</CardTitle>
                <CardSubtitle>10/03/2020</CardSubtitle>
                <CardText>Những em bé mồ côi cha mẹ không nơi nương tựa</CardText>
              </CardBody>
              <Media
                object
                src='img/News/TMC.png'
                style={{ width: '100%', height: '100%' }}
              />
              <CardBody>
                <CardLink href="#">Chi tiết</CardLink>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
};

export default NewsPage;
