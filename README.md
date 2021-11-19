
# AskBnB - Hotel Room Booking API

This is the API for hotel room booking application. This API is divided into diffrent modules viz.
  * **User**
  * **Booking**
  * **Hotels**
  * **Rooms**
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



## API Reference
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

| Parameter | Type     | Description                       |
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
## Usage/Examples

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


## Tech Stack

**Server:** Node, Express

**Database:** MongoDB

**Third Party Libraries:** Google OAuth2.0 API, Razorpay API, Moment.js


## Installation

To install the project with npm, run command

```bash
  npm install
```
To run the project, run command

```bash
  npm start
```
To run tests, run command

```bash
  npm run test
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
- [@Kaushlendra Singh Parihar](https://github.com/Kaus1247)

