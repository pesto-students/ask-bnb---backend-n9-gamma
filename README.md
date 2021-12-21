
# AskBnB - Hotel Room Booking API Server
<br/>
![ASKBnB Logo](./Frame.jpg)

**AskBnB** is an online hotel room booking application. The application is designed
for users who are planning to travel to some destination and want to book their stays in advance. 

It allows users search and book hotel rooms online based on location, checkin and checkout dates and number of 
guests.

Welcome! We hope you enjoy this app as much as we enjoyed making it. 

# Table of Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [Technology Stack](#technology-stack)
4. [Features](#features)
5. [API Reference](#api-reference)
6. [Environment Variables](#environment-variables)
7. [Authors](#authors)
<br/>

## Demo

[Live Demo](https://admiring-wing-bac7ac.netlify.app/)
<br/>

Test Credentials:

- For Booking Rooms
  - Email: pesto@pesto.tech
  - Password: pesto@123

## Installation

- Fork or directly clone this repository to your local machine
- Use the `npm` command to install dependencies
- Once the dependencies are finished installing, use the `npm run start` command inside the root directory to open the app in your local browser of choice
Note: Make sure port number 9000 is not used by any other application. 
<br/>

## Technology Stack

We tried to use a completely modern tech stack while testing out some new technologies that we had never used before. This resulted in a fast, performant, and easily-extensible web app that should be fairly future-proof for the coming next several years. We used:

- [Node JS](https://nodejs.org/en/docs/)
- [Express JS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [MongooseJS](https://mongoosejs.com/)
- [Google OAuth2.0 API](https://github.com/googleapis/google-auth-library-nodejs)
- [JWT](https://jwt.io/)
- [Razorpay API](https://razorpay.com/docs/api/)
<br/>


## Features
The application provides the following features -
- Search hotels based on location, checkin and checkout dates and number of guests.
- Present list of available hotels meeting search criteria.
- Select rooms from an available hotel.
- Register and login (both local and Google OAuth2.0).
- Book hotel rooms by making online payment.
- See booking history for logged in user.

<br />


## API Reference

This is the API for hotel room booking application. This API is divided into diffrent modules viz.
  * [**User**](#user)
  * [**Booking**](#booking)
  * [**Hotels**](#hotels)


The API provides responses in the following standard JSON format
```
{
    status : "Success/Error",
    code : 200/400,
    message : "This is a message",
    data : {
        // All relevant data goes here
    }
}
```



### User
#### Register new user

```http
  POST /api/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

Returns status Code **200/400** with appropiate message.
#### Login

```http
  POST /api/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. |
| `password` | `string` | **Required**. |

Returns **JWT Token** and **_id, name, email** of the user if login is successful. Otherwise, returns 
appropiate **error code and message**
#### Google Login

```http
  POST /api/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `tokenId` | `string` | **Required**. Returned for Google OAuth2 Client |

Returns **JWT Token** and **_id, name, email** of the user if login is successful. Otherwise, returns 
appropiate **error code and message**

### Booking

**NOTE:** To access **PROTECTED** endpoints, authorization JWT token must be sent in 
headers.

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth-token`      | `string` | **Required**. JWT Token received after login. |

#### Create new Booking (PROTECTED)

```http
  POST /api/booking/newbooking
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `hotel_id`      | `string` | **Required**. |
| `check_in`      | `string` | **Required**. |
| `check_out`      | `string` | **Required**. |
| `rooms_booked`      | `Array of objects` | **Required**. |
| `total_amount`      | `string` | **Required**. |

Creates a order with **Razorpay API**, saves the booking data to database and returns
**order details** (if successful). Otherwise, returns appropiate **error code and message**

#### Get booking history (PROTECTED)

```http
  GET /api/booking/bookinghistory
```
No parameters.

Returns all bookings for the logged in user.

### Hotels
#### Get hotel List

```http
  GET /api/hotel/getHotels
  ```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `location`      | `string` | **Required**. |
| `select`      | `string` | **Optional**. |

Returns all hotels available in the specified location

#### Block rooms

```http
  GET /api/hotel/add
  ```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `hotel_id`      | `string` | **Required**. |
| `selected_rooms`      | `string` | **Required**. |
| `startDate`      | `string` | **Required**. |
| `endDate`      | `string` | **Required**. |
 
Block the calender for the selected room for theselected time.

### Usage/Examples

```javascript
// Make REQUEST to endpoint
const response = await axios({
      method: 'post',
      url: 'http://localhost:9000/api/user/login',
      data: {
        email: inputs.email,
        password: inputs.password,
    },
});

// Extract the data from the response object
const payload = response.data;
console.log(payload.status)
console.log(payload.code)
console.log(payload.message)
console.log(payload.data)
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_CONNECT` = Your MongoDB connection string

`TOKEN_SECRET` = SECRET used to sign JWT tokens

`OAUTH_CLIENT_ID` = Google OAuth Client ID

`RAZORPAY_KEY` = Razorpay key

`RAZORPAY_SECRET` = Razorpay secret to verify payment signatures
## Authors

- [@Shahid Barbhuiya](https://github.com/Shahid-prog)
- [@Arvinth Chandrashekaran](https://github.com/ArvinthC3000)

