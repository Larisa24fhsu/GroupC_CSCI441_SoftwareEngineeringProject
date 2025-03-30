-- data for testing wastelesss project

-- Sample Data for Vendor
INSERT INTO Vendor (vendorName, contactInfo, address) VALUES ('Fresh Farms Inc.', 'fresh@farms.com', '101 Green Valley Rd');

-- Sample Data for CompanyDivision
INSERT INTO CompanyDivision (divisionName, manager) VALUES ('Produce Division', 'Sandra Lee');

-- Sample Data for Location
INSERT INTO Location (address, capacity) VALUES ('Warehouse A - Shelf 3', 150);

-- Sample Data for Inventory
INSERT INTO Inventory (name, SKU, batchNumber, category, processedStatus, receivedDate, expirationDate, locationID, isPerishable, shelfLifeDays, alertThresholdDays, storageSpaceRequired, department)
VALUES ('Organic Apples', 'SKU12345', 'B123', 'Fruit', 'received', CURRENT_DATE - 10, CURRENT_DATE + 5, 1, TRUE, 14, 3, 5, 'Produce');

-- Sample Data for AgingInventory
INSERT INTO AgingInventory (itemID, agingDate, quantity) VALUES (1, CURRENT_DATE - 5, 20);

-- Sample Data for Customer
INSERT INTO Customer (customerName, email, phone, address) VALUES ('Jane Doe', 'jane.doe@email.com', '123-456-7890', '789 Main St');

-- Sample Data for Orders
INSERT INTO Orders (customerID, orderDate, shippingStatus) VALUES (1, CURRENT_DATE, 'pending');

-- Sample Data for OrderItems
INSERT INTO OrderItems (orderID, itemID, quantity) VALUES (1, 1, 3);

-- Sample Data for Alerts
INSERT INTO Alerts (alertType, affectedItemID, alertStatus, department) VALUES ('Low Stock', 1, 'Active', 'Inventory');

-- Sample Data for UserAccount
INSERT INTO UserAccount (username, password) VALUES ('admin', 'encryptedpassword123');

-- Sample Data for Shipping
INSERT INTO Shipping (carrierName, trackingNumber, vendorID, estimatedDeliveryDate) VALUES ('QuickShip', 'TRACK123', 1, CURRENT_DATE + 3);