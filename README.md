Features:

1. Car Inventory Management
=> Add, update, and delete car details.
=> Track inventory with quantity and in-stock status.

2. Search and Filter Cars
=> Search cars by brand, model, category, or price range.

3. Order Processing
=> Place customer orders while validating stock availability.
=> Automatically update inventory after each order.

4. Dynamic Stock Updates
=> Automatically set inStock to false when inventory quantity reaches zero.

5. Revenue Calculation
=> Calculate total revenue from all orders using MongoDB aggregation.

6. Error Handling
=> Gracefully handles insufficient stock, invalid requests, and other common issues.

7. RESTful API Architecture
=> Clean and modular design following REST principles for easy integration.

8. MongoDB Integration
=> Fully utilizes MongoDB for data storage with Mongoose for schema modeling.

9. Secure and Scalable
=> Validates inputs and secures endpoints with middleware for production readiness.

10. Modern Tech Stack
=> Built with Node.js, Express, and MongoDB for high performance and scalability.


--Technologies Used--
1.Backend: Node.js, Express.js
2.Database: MongoDB, Mongoose
3.Testing: Postman for API testing
4.Environment Variables: dotenv for secure configuration


---API Endpoints---

1. Car Endpoints

-> GET /api/cars: Get all cars or filter by search term.
-> POST /api/cars: Add a new car (admin only).
-> PUT /api/cars/:id: Update car details (admin only).
-> DELETE /api/cars/:id: Delete a car (admin only).


2. Order Endpoints

-> POST /api/orders: Place an order for a car.
->GET /api/orders/revenue: Calculate total revenue from all orders.
