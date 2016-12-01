/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/',

  async action() {
    const apiKey = 'dc6zaTOxFJmzC';
    const path = 'https://api.giphy.com/v1/gifs/random';
    const tag = 'Cat';

    const resp = await fetch(`${path}?api_key=${apiKey}&tag=${tag}`, {
      credentials: 'same-origin',
    });
    const { data } = await resp.json();

    if (!data || resp.status !== 200) throw new Error('Failed to load.');
    return {
      title: 'React Starter Kit with Giphy Cats',
      component: <Layout><Home tag={tag} imageUrl={data.image_url} /></Layout>,
    };
  },

};
