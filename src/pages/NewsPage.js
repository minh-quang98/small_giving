import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';
import Page from 'components/Page';



class NewsPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      animating: false,

    }
  }

  render () {
    let {fakeData, activeIndex} = this.state
    return (
      <Page title="Tin tức" >
      </Page>
    );
  }
};

export default NewsPage;
