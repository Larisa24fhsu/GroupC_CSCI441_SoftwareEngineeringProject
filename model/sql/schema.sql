-- Cleaned schema for Wastelesss project

-- Vendor Table
CREATE TABLE Vendor (
    vendorID SERIAL PRIMARY KEY,
    vendorName VARCHAR(100) NOT NULL,
    contactInfo VARCHAR(255),
    address VARCHAR(255)
);

-- Company Division Table
CREATE TABLE CompanyDivision (
    divisionID SERIAL PRIMARY KEY,
    divisionName VARCHAR(100) NOT NULL,
    manager VARCHAR(100)
);

-- Location Table
CREATE TABLE Location (
    locationID SERIAL PRIMARY KEY,
    address VARCHAR(255),
    capacity INT
);

-- Inventory Table
CREATE TABLE Inventory (
    itemID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    SKU VARCHAR(50) UNIQUE NOT NULL,
    batchNumber VARCHAR(50),
    category VARCHAR(50),
    processedStatus VARCHAR(50),
    receivedDate DATE NOT NULL,
    expirationDate DATE,
    locationID INT REFERENCES Location(locationID),
    isPerishable BOOLEAN DEFAULT FALSE,
    shelfLifeDays INT,
    alertThresholdDays INT,
    storageSpaceRequired INT,
    department VARCHAR(100),
    timestampReceived TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    demand INT DEFAULT 0,
    orderingCost DECIMAL(10,2) DEFAULT 0.00,
    holdingCostPerYear DECIMAL(10,2) DEFAULT 0.00
);

-- Aging Inventory Table
CREATE TABLE AgingInventory (
    agingID SERIAL PRIMARY KEY,
    itemID INT REFERENCES Inventory(itemID),
    agingDate DATE NOT NULL,
    quantity INT NOT NULL
);

-- Customer Table
CREATE TABLE Customer (
    customerID SERIAL PRIMARY KEY,
    customerName VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(50),
    address VARCHAR(255)
);

-- Orders Table
CREATE TABLE Orders (
    orderID SERIAL PRIMARY KEY,
    customerID INT REFERENCES Customer(customerID),
    orderDate DATE NOT NULL DEFAULT CURRENT_DATE,
    shippingStatus VARCHAR(50) DEFAULT 'pending'
);

-- Order Items Table (join table)
CREATE TABLE OrderItems (
    orderItemID SERIAL PRIMARY KEY,
    orderID INT REFERENCES Orders(orderID) ON DELETE CASCADE,
    itemID INT REFERENCES Inventory(itemID),
    quantity INT NOT NULL DEFAULT 1
);

-- Alerts Table
CREATE TABLE Alerts (
    alertID SERIAL PRIMARY KEY,
    alertType VARCHAR(50) NOT NULL,
    affectedItemID INT REFERENCES Inventory(itemID) ON DELETE SET NULL,
    dateTriggered DATE DEFAULT CURRENT_DATE,
    alertStatus VARCHAR(50),
    department VARCHAR(100)
);

-- User Account Table
CREATE TABLE UserAccount (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    roles VARCHAR(50) DEFAULT 'user'
);

-- Shipping Table
CREATE TABLE Shipping (
    shippingID SERIAL PRIMARY KEY,
    carrierName VARCHAR(100),
    trackingNumber VARCHAR(100),
    vendorID INT REFERENCES Vendor(vendorID),
    estimatedDeliveryDate DATE
);
