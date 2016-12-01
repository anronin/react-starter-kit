
import React from 'react';
import Reddit from './Reddit';
import Layout from '../../components/Layout';

export default {

  path: '/reddit',

  async action() {
    return {
      title: 'Reddit API Use Case',
      component: <Layout><Reddit /></Layout>,
    };
  },

};
