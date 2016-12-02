import fetch from '../core/fetch';

function getLocaleData() {
  return async function localeData({ locale }) {
    const fetchConfig = {
      credentials: 'include',
    };

    const resp = await fetch(`/translations?lang=${locale}`, fetchConfig);

    if (resp.status !== 200) throw new Error(resp.statusText);
    return await resp.json();
  };
}

function createFetchKnowingCookie({ cookie }) {
  if (!process.env.BROWSER) {
    return (url, options = {}) => {
      const isLocalUrl = /^\/($|[^/])/.test(url);

      // pass cookie only for itself.
      // We can't know cookies for other sites BTW
      if (isLocalUrl && options.credentials === 'include') {
        const headers = {
          ...options.headers,
          cookie,
        };
        return fetch(url, { ...options, headers });
      }

      return fetch(url, options);
    };
  }

  return fetch;
}

export default function createHelpers(config) {
  const fetchKnowingCookie = createFetchKnowingCookie(config);
  const localeData = getLocaleData();

  return {
    fetch: fetchKnowingCookie,
    localeData,
    history: config.history,
  };
}
