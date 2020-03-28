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
          <Col md="6" sm="12" xs="12">
            <Card >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" >
                    R
          </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={this.state.data.TenTin}
                subheader="September 14, 2016"
              />
              <Media
                  object
                  src={NGND}
                  className="rounded mr-2 mb-2"
                  style={{ width: '100%', height: '100%' }}
                />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
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
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                    minutes.
          </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
          </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Col>
          <Col md="6" sm="12" xs="12">
            <Card >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" >
                    R
          </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardMedia

                image="/static/images/cards/paella.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton

                  onClick={() => this.handleExpandClick()}
                  aria-expanded={this.state.expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                    minutes.
          </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
          </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
};

export default NewsPage;
