const express = require("express");
const axios = require("axios");
const cors = require("cors");
const net = require("net");
const mongoose = require("mongoose");
const { log } = require("util");

require('dotenv').config();
const apiUrl = process.env.API_URL;

mongoose.connect("mongodb://localhost:27017/place-scape", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB'ye bağlandı!");
});

const app = express();
app.use(cors());
app.use(express.json());

const options = {
  headers: {
    Accept: "application/json",
    app_id: "f3cf5d16",
    app_key: "c76d4afd9bc6b8d168344ad6c7d84bd7",
    ResourceVersion: "v4",
  },
};

// Port kullanımını kontrol etmek için bir fonksiyon
function checkPortInUse(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(port);
    server.on("listening", () => {
      server.close();
      resolve(false); // Port kullanılabilir
    });
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(true); // Port kullanımda
      } else {
        reject(err);
      }
    });
  });
}

// API endpoints

// ticket schema
const ticketSchema = new mongoose.Schema({
  flightID: Number,
  flightDirection: String,
  departure: Date,
  arrival: Date,
  ata: String,
  cao: String,
  price: String,
  airlineName: String,
  flightDuration: String,
  destinationsLength: Number,
  arrivalCity: String,
  departureCity: String,
  userID: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema, 'savedTickets');
// saved tickets add
app.post("/api/saved-ticket-add", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    console.log(ticket);
    
    // save() metodunu await ile kullanıyoruz
    const savedTicket = await ticket.save();
    res.json(savedTicket);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// saved tickets get
app.get("/api/saved-tickets", async (req, res) => {
  try {
    const userId = req.query.id; // get userid

    const tickets = await Ticket.find({ userID: userId });

    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// saved tickets delete
app.delete("/api/saved-ticket-delete", async (req, res) => {
  try {
    const ticketID = req.query.id;

    const deletedTicket = await Ticket.findOneAndDelete({flightID : ticketID});

    res.json(deletedTicket);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// tickets
app.get("/api/tickets", async (req, res) => {
  try {
    const response = await axios.get(
      apiUrl+"flights?includedelays=false&page=0&sort=%2BscheduleTime",
      options
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// airlines
app.get("/api/airlines", async (req, res) => {
  try {
    const response = await axios.get(
      apiUrl+`airlines/${req.query.ata}`,
      options
    );
    res.json(response.data);
  } catch (error) {
    res.json({ publicName: "No information" });
    // res.status(500).send("Internal Server Error");
  }
});

// citys
app.get("/api/city", async (req, res) => {
  try {
    const response = await axios.get(
      apiUrl+`destinations/${req.query.ata}`,
      options
    );
    res.json(response.data);
  } catch (error) {
    res.json({ city: "No information" });
    // res.status(500).send("Internal Server Error");
  }
});

// Başlangıç portu
const PORT = process.env.PORT || 5000;

// Eğer port kullanımda ise, rastgele bir port seç
(async function startServer() {
  let port = PORT;

  while (await checkPortInUse(port)) {
    port++;
    if (port > 65535) {
      // maksimum port numarası
      console.error("Tüm portlar kullanımda!");
      return;
    }
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
