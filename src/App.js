import AuthForm, { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
// import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout, } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './styles/reduction.scss';
import Cookies from 'js-cookie';

import Home from "./pages/MainPage"
import DonationPage from "./pages/DonationPage"
import NewsPage from "./pages/NewsPage"
import DonationDetail from "./pages/DonationDetailPage"
import ConsiderPage from "./pages/ConsiderPage"
import GuidePage from "./pages/GuidePage"
import HistoryPage from "./pages/HistoryPage"
import ContactPage from "./pages/ContactPage"
import ProfileUser from "./pages/ProfileUser"
import Admin from "./pages/admin"
import NewsDetailPage from './pages/NewsDetailPage';


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  state = {
    token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
  };

  render() {
    return (
      <MainLayout breakpoint={this.props.breakpoint}>
        {/*<div>*/}
        {/*<BrowserRouter basename={getBasename()}>*/}
        {/*<GAListener>*/}
        {/*  <Switch>*/}
        {/*    <MainLayout breakpoint={this.props.breakpoint}>*/}
        {/*      <React.Suspense fallback={<PageSpinner/>}>*/}
        <Route exact path="/" component={Home} />
        <Route path="/donation" component={DonationPage} />
        <Route path="/news" component={NewsPage} />
        <Route path="/donation-detail" component={DonationDetail} />
        <Route path="/news-detail" component={NewsDetailPage} />
        {this.state.token !== ""
          ? <Route exact path="/consider" component={ConsiderPage} />
          : <Redirect to="/" />
        }
        <Route path="/guides" component={GuidePage} />

        {this.state.token !== ""
          ? <Route path="/history" component={HistoryPage} />
          : <Redirect to="/" />
        }
        <Route path="/contact" component={ContactPage} />

        {this.state.token !== ""
          ? <Route path="/profile" component={ProfileUser} />
          : <Redirect to="/" />
        }
        <Route path="/admin" component={Admin} />

        {/*</React.Suspense>*/}
        {/*</MainLayout>*/}
        {/*</Switch>*/}
        {/*</GAListener>*/}
        {/*</BrowserRouter>*/}

        {/*</div>*/}
      </MainLayout>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

// export default componentQueries(query)(App);
export default withRouter(App);
