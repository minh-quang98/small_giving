import AuthForm, { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout,  } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import Cookies from 'js-cookie';


const DonationPage = React.lazy(() => import('pages/DonationPage'));
const NewsPage = React.lazy(() => import('pages/NewsPage'));
const MainPage = React.lazy(() => import('pages/MainPage'));
const HistoryPage = React.lazy(() => import('pages/HistoryPage'));
const GuidePage = React.lazy(() => import('pages/GuidePage'));
const ContactPage = React.lazy(() => import('pages/ContactPage'));
const ConsiderPage = React.lazy(() => import('pages/ConsiderPage'));
const ProfileUser = React.lazy(() => import('pages/ProfileUser'));
const DonationDetail = React.lazy(() => import('pages/DonationDetailPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  state = {
    token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
  };

  render() {
    return (
      <div>
          <BrowserRouter basename={getBasename()}>
            <GAListener>
              <Switch>
                <MainLayout breakpoint={this.props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner/>}>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/donation" component={DonationPage}/>
                    <Route exact path="/contact" component={ContactPage}/>
                    <Route exact path="/guides" component={GuidePage}/>
                    <Route exact path="/history" component={HistoryPage}/>
                    <Route exact path="/news" component={NewsPage}/>
                    <Route exact path="/consider" component={ConsiderPage}/>
                    <Route exact path="/donation-detail" component={DonationDetail}/>
                    {this.state.token !== ""
                      ? <Route exact path="/profile" component={ProfileUser}/>
                      : <Redirect to="/"/>
                    }
                  </React.Suspense>
                </MainLayout>
                <Redirect to="/"/>
              </Switch>
            </GAListener>
          </BrowserRouter>
        }
      </div>
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

export default componentQueries(query)(App);
