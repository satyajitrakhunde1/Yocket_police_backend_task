const cities = [
    { name: 'Yapkashnagar', distance: 60 },
    { name: 'Lihaspur', distance: 50 },
    { name: 'Narmis City', distance: 40 },
    { name: 'Shekharvati', distance: 30 },
    { name: 'Nuravgram', distance: 20 }
  ];
  
  const vehicles = [
    { kind: 'EV Bike', range: 60, count: 2 },
    { kind: 'EV Car', range: 100, count: 1 },
    { kind: 'EV SUV', range: 120, count: 1 }
  ];
  
  const fugitiveLocation = cities[Math.floor(Math.random() * cities.length)].name;
  
  module.exports = { cities, vehicles, fugitiveLocation };
  