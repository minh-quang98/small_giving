import React from 'react';
import {
  Col, Row,Media
} from 'reactstrap';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Page from 'components/Page';
import moment from 'moment';
import NEBN from "assets/img/news-banner.png";
import NGND from 'assets/img/NGND.jpg';

class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      detailNew1: false,
      detailNew2: false,
      data: []
    }
  }
  componentDidMount() {
    this.getNew()
  }
  getNew = async () => {
    fetch('https://misappmobile.000webhostapp.com/Tinhoatdong/tinhoatdong.php')
      .then((response) => response.json())
      .then((data) => {
          this.setState({
            data: data
          },()=>console.log("kiemtradulieu",this.state.data)
          )
        });
      }
  handleExpandClick = () => {
    this.setState({
      expanded: true
    })
  };
  handleExpandClickClose = () => {
    this.setState({
      expanded: false
    })
  };
  hanldeShowDetail1() {
    this.setState({
      detailNew1: true
    })
  }

  hanldeShowDetail2() {
    this.setState({
      detailNew2: true
    })
  }

  hanldeHideDetail1() {
    this.setState({
      detailNew1: false
    })
  }

  hanldeHideDetail2() {
    this.setState({
      detailNew2: false
    })
  }

  render() {
    // let {fakeData, activeIndex} = this.state
    return (
      <Page title="Tin tức" >
        <Row>
          {this.state.data.map((Item,index)=>{
            return (
              <Col md="6" sm="12" xs="12">
            <Card >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" >
                    SG
          </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={Item.TenTin}
                subheader={moment(Item.ThoiGian).format('LLLL')}
              />
              <Media
                  object
                  src={NGND}
                  className="rounded mr-2 mb-2"
                  style={{ width: '100%', height: '100%' }}
                />
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                {
                  this.state.expanded ?
                    <IconButton

                      onClick={() => this.handleExpandClickClose()}
                      aria-expanded={this.state.expanded}
                      aria-label="Thu gọn"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                    : <IconButton
                      onClick={() => this.handleExpandClick()}
                      aria-expanded={this.state.expanded}
                      aria-label="Xem thêm"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                }

              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                {Item.NoiDung}
                </CardContent>
              </Collapse>
            </Card>
          </Col>
            )
          })}
        </Row>
      </Page>
    );
  }
};

export default NewsPage;
