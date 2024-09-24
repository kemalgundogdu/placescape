import axios from "axios";

// process.env.api_url
const apiUrl = process.env.REACT_APP_API_URL;

const options = {
  headers: {
    Accept: "application/json",
    app_id: "f3cf5d16",
    app_key: "c76d4afd9bc6b8d168344ad6c7d84bd7",
    ResourceVersion: "v4",
  },
};

// saved ticket add
export const addSavedTicket = async (ticket) => {
  const url = `${apiUrl}/saved-ticket-add`;  // Burada / ekledik
  console.log(ticket);
  
  try {
    const response = await axios.post(url, ticket, options); // options ekledik
    return response.data;
  } catch (error) {
    console.error("axios hatası", error);
    throw error;
  }
};

// saved ticket get
export const getSavedTickets = async (userID) => {
  const url = `${apiUrl}/saved-tickets?id=${userID}`;  // Burada / ekledik
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("axios hatası", error);
    throw error;
  }
};

// saved ticket delete
export const deleteSavedTicket = async (ticketID) => {
  const url = `${apiUrl}/saved-ticket-delete?id=${ticketID}`;  // Burada / ekledik
  try {
    const response = await axios.delete(url, options);
    return response.data;
  } catch (error) {
    console.error("axios hatası", error);
    throw error;
  }
};

// tickets
export const getTickets = async () => {
  const url = `${apiUrl}/tickets`;  // Burada / ekledik
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("axios hatası", error);
    throw error;
  }
};

// airline
export const getAirline = async (ata) => {
  const url = `${apiUrl}/airlines?ata=${ata}`;  // Burada / ekledik
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("axios hatası", error);
    throw error;
  }
};

// city
export const getCity = async (ata) => {
  const url = `${apiUrl}/city?ata=${ata}`;  // Burada / ekledik
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("axios hatası", error);
    throw error;
  }
}