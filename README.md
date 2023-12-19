# E-Commerce Application

This is an e-commerce application built using Vue.js, Pinia, Express.js, Sequelize, and PostgreSQL.

# API Documentation

## Endpoints :

List of available endpoints:

-   `GET /products`
-   `GET /products/:id`
-   `POST /login`
-   `POST /register`
-   `GET /orders`
-   `PATCH /orders`
-   `GET /orders/:id`
-   `GET /categories`
-   `GET /carts`
-   `DELETE /carts`
-   `POST /carts/:ProductId`
-   `DELETE /carts/:ProductId`
-   `PATCH /carts/:ProductId`
-   `POST /payment-token`

&nbsp;

## 1. GET /products

Description: get all products

_Response (200 - OK)_

Query Parameters

-   search(string, optional) = search product by product name
-   page(integer, optional) = retrieve products based on page pagination
-   categoryId(string, option) = retrieve products based on that category

```json
[
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "imageUrl": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "price": 100000,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "rating": 3.9,
        "CategoryId": 3,
        "createdAt": "2023-08-02T18:53:10.574Z",
        "updatedAt": "2023-08-02T18:53:10.574Z"
    }
]
```

&nbsp;

## 2. GET /products/:id

Description: get product detail

_Response (200 - OK)_

```json
{
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "imageUrl": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "price": 100000,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "rating": 3.9,
    "CategoryId": 3,
    "createdAt": "2023-08-02T18:53:10.574Z",
    "updatedAt": "2023-08-02T18:53:10.574Z"
}
```

&nbsp;

## 3. POST /login

Description: login user

-   body:

```json
{
    "email": "bryan2@gmail.com",
    "password": "bryan1234"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA1NjU0fQ.NPEMWu-ll1TPYMbP4axTI8a6FpNP_vLr9oXE6oYO0BU",
    "user": {
        "name": "bryan",
        "email": "bryan2@gmail.com"
    }
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email/password"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email cannot be empty"
}
```

```json
{
    "message": "Password cannot be empty"
}
```

&nbsp;

## 4. POST/register

Description: Create new user

-   body:

```json
{
    "name": "bryan",
    "email": "bryan2@gmail.com",
    "password": "bryan1234"
}
```

_Response (201 - Created)_

```json
{
    "id": 1,
    "email": "bryan@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Name is required"
}
```

```json
{
    "message": "Email is required"
}
```

```json
{
    "message": "Password is required"
}
```

&nbsp;

## 5. GET /orders

Description: get all orders

headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA2MzQxfQ.5lSqelb8ugev1-B9VzpTLPDikRVK1Q0O3KrHA2QUf6U"
}
```

_Response (200 - Ok)_

```json
[
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    ...
]
```

&nbsp;

## 6. PATCH /orders

Description: update order status

headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA2MzQxfQ.5lSqelb8ugev1-B9VzpTLPDikRVK1Q0O3KrHA2QUf6U"
}
```

_Response (200 - Ok)_

```json
{
    "message": "payment status has been updated"
}
```

_Response (404- Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 7. GET /orders/:id

Description: get order detail

headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA2MzQxfQ.5lSqelb8ugev1-B9VzpTLPDikRVK1Q0O3KrHA2QUf6U"
}
```

_Response (200 - Ok)_

```json
[
    {
        "id": 35,
        "OrderId": 10,
        "ProductId": 10,
        "quantity": 1,
        "createdAt": "2023-08-02T12:26:26.376Z",
        "updatedAt": "2023-08-02T12:26:26.376Z",
        "Product": {
            "id": 10,
            "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
            "imageUrl": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
            "price": 109,
            "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
            "weight": 1,
            "rating": 2.9,
            "stock": null,
            "CategoryId": 2,
            "createdAt": "2023-08-02T11:10:14.620Z",
            "updatedAt": "2023-08-02T11:10:14.620Z"
        }
    },
    ...
}
```

&nbsp;

## 8. GET /categories

Description: get all categories

_Response (200 - Ok)_

```json
[
    {
        "id": 1,
        "name": "electronics",
        "createdAt": "2023-08-02T18:53:10.571Z",
        "updatedAt": "2023-08-02T18:53:10.571Z"
    }
]
```

&nbsp;

## 8. GET /carts

Description: get all user's product in cart

headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA2MzQxfQ.5lSqelb8ugev1-B9VzpTLPDikRVK1Q0O3KrHA2QUf6U"
}
```

_Response (200 - Ok)_

```json
[
    {
        "id": 19,
        "UserId": 2,
        "ProductId": 6,
        "quantity": 1,
        "createdAt": "2023-08-02T20:17:02.827Z",
        "updatedAt": "2023-08-02T20:17:02.827Z",
        "Product": {
            "id": 6,
            "title": "Solid Gold Petite Micropave ",
            "imageUrl": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
            "price": 168000,
            "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
            "rating": 3.9,
            "CategoryId": 2,
            "createdAt": "2023-08-02T18:53:10.574Z",
            "updatedAt": "2023-08-02T18:53:10.574Z"
        }
    },
```

&nbsp;

## 9. DELETE /carts

Description: Remove all products from user's cart

headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA2MzQxfQ.5lSqelb8ugev1-B9VzpTLPDikRVK1Q0O3KrHA2QUf6U"
}
```

_Response (200 - Ok)_

```json
{
    "message": "User cart has been emptied"
}
```

&nbsp;

## 10. POST /carts/:ProductId

Description: Add product to cart

headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA2MzQxfQ.5lSqelb8ugev1-B9VzpTLPDikRVK1Q0O3KrHA2QUf6U"
}
```

_Response (200 - Ok)_

```json
{
    "message": "Product has been added to cart"
}
```

_Response (404- Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 11. DELETE /carts/:ProductId

Description: delete product from cart

headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA2MzQxfQ.5lSqelb8ugev1-B9VzpTLPDikRVK1Q0O3KrHA2QUf6U"
}
```

_Response (200 - Ok)_

```json
{
    "message": "Product has been removed from cart"
}
```

_Response (404- Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 12. PATCH /carts/:ProductId

Description: Update quantity of product in cart

headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA2MzQxfQ.5lSqelb8ugev1-B9VzpTLPDikRVK1Q0O3KrHA2QUf6U"
}
```

_Response (200 - Ok)_

```json
{
    "message": "Product Cart quantity has been incremented"
}
```

```json
{
    "message": "Product Cart quantity has been decremented"
}
```

_Response (404- Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 13. POST /payment-token

Description: generate payment token

headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJicnlhbjJAZ21haWwuY29tIiwiaWF0IjoxNjkxMDA2MzQxfQ.5lSqelb8ugev1-B9VzpTLPDikRVK1Q0O3KrHA2QUf6U"
}
```

_Response (200 - Ok)_

```json
{
    "midtransToken": {
        "token": "d94a9bba-383b-4815-b504-67f0d8fa985a",
        "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/d94a9bba-383b-4815-b504-67f0d8fa985a"
    },
    "orderId": 10
}
```

_Response (400- Bad Request)_

```json
{
    "message": "Midtrans error"
}
```

&nbsp;

## Global Error

_Response (400 - Bad Request)_

```json
{
    "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal server error"
}
```

WISHLIST ROUTING DEPRECATED (NOT USED)

## Frontend Repository

For the frontend implementation of this e-commerce application, please visit our [Frontend Repository](https://github.com/BryMat24/ecommerce-client).
