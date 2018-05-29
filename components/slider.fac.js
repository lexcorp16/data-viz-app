(() => {
  'use strict';

  const getUrl = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-0${today.getMonth() +
      1}-${today.getDate()}`;

    return `https://studio-api.paystack.co/insights/spenders?from=2017-01-01&to=${date}`;
  };

  angular
    .module('ngApp')
    .constant('SECRET_KEY', 'sk_test_584bfc762c9d0eeb4f4dc722912f3b22f3c4c925')
    .factory('sliderFactory', ($http, SECRET_KEY) => {
      $http.defaults.headers.common['Authorization'] = `Bearer ${SECRET_KEY}`;

      const url = getUrl();
      const getData = () => $http.get(url);

      const calculateTotalSpend = data => {
        let total = 0;
        for (const datum of data) {
          total += datum.total_transaction_amount;
        }
        return total;
      };

      const getGroupOfCustomers = (data, value) => {
        return data.slice(0, value);
      };

      return {
        getData,
        calculateTotalSpend,
        getGroupOfCustomers,
      };
    });
})();
