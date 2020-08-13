export const createClient = ({
    base = '',
    params: clientParams,
  }) => {
    return (path, params = {}) => {
      const getString = new URLSearchParams({ ...clientParams, ...params });
      return fetch(`${base}${path}?${getString}`).then(r => r.json());
    };
  };