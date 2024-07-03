

const express = require('express');
const cors = require('cors');
const { cities, vehicles, fugitiveLocation } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

let vehicleCounts = vehicles.reduce((acc, vehicle) => {
  acc[vehicle.kind] = vehicle.count;
  return acc;
}, {});

app.get('/cities', (req, res) => {
  res.json(cities);
});

app.get('/vehicles', (req, res) => {
  res.json(vehicles.map(vehicle => ({
    ...vehicle,
    count: vehicleCounts[vehicle.kind]
  })));
});

app.post('/result', (req, res) => {
  const { copSelections } = req.body;
  let successfulCop = null;

  copSelections.forEach(selection => {
    if (selection.city === fugitiveLocation) {
      successfulCop = selection.cop;
    }
  });

  if (successfulCop) {
    res.json({ captured: true, cop: successfulCop });
  } else {
    res.json({ captured: false });
  }
});

const reserveVehicle = (vehicle) => {
  if (vehicleCounts[vehicle] > 0) {
    vehicleCounts[vehicle]--;
    return true;
  }
  return false;
};

app.post('/reserveVehicle', (req, res) => {
  const { vehicle } = req.body;

  if (reserveVehicle(vehicle)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
