	SET FOREIGN_KEY_CHECKS= 0;
    DROP TABLE IF EXISTS Review, Portfolio_Holding, Transactions, Price, Portfolio, Client, Advisor, Instrument, Superstore_Staging;
    DROP PROCEDURE IF EXISTS Worst_Performing_Portfolio;
     SET FOREIGN_KEY_CHECKS=1;

    CREATE TABLE Advisor (
		advisor_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        certification VARCHAR(100),
        phone VARCHAR(20),
        email VARCHAR(100),
        date_joined DATE
	);

    CREATE TABLE Client (
		client_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255),
        email VARCHAR(100),
        phone VARCHAR(20),
        risk_profile VARCHAR(20),
        date_joined DATE,
        advisor_id INT NOT NULL,
        FOREIGN KEY (advisor_id) REFERENCES Advisor(advisor_id)
			ON DELETE RESTRICT ON UPDATE CASCADE
	);
    
    CREATE TABLE Portfolio (
		portfolio_id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        portfolio_name VARCHAR(100),
        creation_date DATE,
        FOREIGN KEY (client_id) REFERENCES Client(client_id)
			ON DELETE CASCADE 
            ON UPDATE CASCADE
	);
    
    CREATE TABLE Instrument (
		instrument_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        instrument_type Varchar(50),
        ticker VARCHAR(10)
	);
    
    CREATE TABLE Transactions (
		transactions_id INT AUTO_INCREMENT PRIMARY KEY,
		portfolio_id INT NOT NULL,
		instrument_id INT NOT NULL,
		transactions_type ENUM('BUY','SELL') NOT NULL,
		transactions_date DATE,
		quantity INT,
		trading_price DECIMAL(10,2),
		FOREIGN KEY (portfolio_id) REFERENCES Portfolio(portfolio_id)
			ON DELETE CASCADE,
		FOREIGN KEY (instrument_id) REFERENCES Instrument(instrument_id)
			ON DELETE CASCADE
	);
    
      CREATE TABLE Portfolio_Holding (
		holding_id INT AUTO_INCREMENT PRIMARY KEY,
        portfolio_id INT NOT NULL,
        instrument_id INT NOT NULL,
        quantity DECIMAL(12,2) NOT NULL,
        CONSTRAINT fk_ph_portfolio
			FOREIGN KEY(portfolio_id) REFERENCES Portfolio(portfolio_id)
            ON DELETE CASCADE,
            CONSTRAINT fk_ph_instrument
            FOREIGN KEY (instrument_id) REFERENCES Instrument(instrument_id)
            ON DELETE CASCADE,
		UNIQUE (portfolio_id, instrument_id)
	);
    
    CREATE TABLE Price (
		price_id INT AUTO_INCREMENT PRIMARY KEY,
        instrument_id INT NOT NULL,
        price_date DATE NOT NULL,
        open_price DECIMAL(10,2),
        close_price DECIMAL(10,2),
        high_price DECIMAL(10,2),
        low_price DECIMAL(10,2),
        CONSTRAINT fk_price_instrument
			FOREIGN KEY (instrument_id) REFERENCES Instrument(instrument_id)
			ON DELETE CASCADE,
		UNIQUE (instrument_id, price_date)
	);
    
    CREATE TABLE Review (
		review_id INT AUTO_INCREMENT PRIMARY KEY,
		portfolio_id INT NOT NULL,
		review_date date, 
		rating INT,
		comments TEXT,
		FOREIGN KEY (portfolio_id) REFERENCES Portfolio(portfolio_id)
			ON DELETE CASCADE
	);
    
    CREATE TABLE Superstore_Staging (
		order_id VARCHAR(20),
        order_date DATE,
        ship_date DATE,
        customer_name VARCHAR(100),
        segment VARCHAR(50),
        product_name VARCHAR(150),
        category VARCHAR(50),
        quantity INT,
        sales DECIMAL(10,2)
	);

INSERT INTO Superstore_Staging
(order_id, order_date, ship_date, customer_name, segment, product_name, category, quantity, sales)
VALUES
('CA-001', '2023-01-10', '2023-01-15', 'John Smith', 'Consumer', 'Laptop', 'Technology', 2, 2400.00),
('CA-002', '2023-01-22', '2023-01-25', 'Maria Lopez', 'Corporate', 'Printer', 'Office Supplies', 1, 350.00),
('CA-003', '2023-02-05', '2023-02-10', 'David Johnson', 'Home Office', 'Desk Chair', 'Furniture', 3, 540.00),
('CA-004', '2023-02-18', '2023-02-22', 'Emily Chen', 'Consumer', 'Tablet', 'Technology', 1, 620.00),
('CA-005', '2023-03-01', '2023-03-06', 'Robert Brown', 'Corporate', 'Monitor', 'Technology', 2, 780.00),
('CA-006', '2023-03-12', '2023-03-17', 'Linda Garcia', 'Home Office', 'Bookcase', 'Furniture', 1, 410.00),
('CA-007', '2023-03-25', '2023-03-30', 'Michael Davis', 'Consumer', 'Smartphone', 'Technology', 1, 899.00),
('CA-008', '2023-04-02', '2023-04-07', 'Sarah Wilson', 'Corporate', 'Paper Shredder', 'Office Supplies', 2, 260.00),
('CA-009', '2023-04-15', '2023-04-20', 'James Martinez', 'Home Office', 'Standing Desk', 'Furniture', 1, 950.00),
('CA-010', '2023-04-28', '2023-05-02', 'Patricia Anderson', 'Consumer', 'Wireless Mouse', 'Technology', 4, 160.00),

('CA-011', '2023-05-06', '2023-05-11', 'Christopher Lee', 'Corporate', 'Conference Phone', 'Technology', 1, 480.00),
('CA-012', '2023-05-18', '2023-05-23', 'Angela Walker', 'Home Office', 'Filing Cabinet', 'Furniture', 2, 620.00),
('CA-013', '2023-06-01', '2023-06-05', 'Daniel Hall', 'Consumer', 'Headphones', 'Technology', 3, 450.00),
('CA-014', '2023-06-14', '2023-06-19', 'Sophia Young', 'Corporate', 'Whiteboard', 'Office Supplies', 2, 300.00),
('CA-015', '2023-06-27', '2023-07-01', 'Anthony Hernandez', 'Home Office', 'Desk Lamp', 'Furniture', 2, 180.00),

('CA-016', '2023-07-10', '2023-07-15', 'Kevin Moore', 'Consumer', 'External Hard Drive', 'Technology', 2, 220.00),
('CA-017', '2023-07-22', '2023-07-26', 'Rachel Clark', 'Corporate', 'Router', 'Technology', 1, 190.00),
('CA-018', '2023-08-04', '2023-08-09', 'Brian Lewis', 'Home Office', 'Office Chair', 'Furniture', 1, 310.00),
('CA-019', '2023-08-16', '2023-08-21', 'Natalie Perez', 'Consumer', 'Keyboard', 'Technology', 3, 210.00),
('CA-020', '2023-08-28', '2023-09-02', 'Justin Kim', 'Corporate', 'Projector', 'Technology', 1, 720.00),

('CA-021', '2023-09-10', '2023-09-15', 'Laura Ramirez', 'Home Office', 'Storage Cabinet', 'Furniture', 1, 430.00),
('CA-022', '2023-09-22', '2023-09-27', 'Steven Wright', 'Consumer', 'Webcam', 'Technology', 2, 180.00),
('CA-023', '2023-10-05', '2023-10-10', 'Megan Scott', 'Corporate', 'Desk Organizer', 'Office Supplies', 4, 120.00),
('CA-024', '2023-10-18', '2023-10-22', 'Carlos Rivera', 'Home Office', 'Office Table', 'Furniture', 1, 860.00),
('CA-025', '2023-11-01', '2023-11-06', 'Alyssa Thompson', 'Consumer', 'Bluetooth Speaker', 'Technology', 2, 300.00),

('CA-026', '2023-11-14', '2023-11-19', 'Mark Robinson', 'Corporate', 'Scanner', 'Technology', 1, 410.00),
('CA-027', '2023-11-26', '2023-12-01', 'Isabella Torres', 'Home Office', 'Shelf Unit', 'Furniture', 2, 520.00),
('CA-028', '2023-12-05', '2023-12-10', 'Ethan Parker', 'Consumer', 'USB Hub', 'Technology', 3, 90.00),
('CA-029', '2023-12-12', '2023-12-17', 'Olivia Bennett', 'Corporate', 'Laser Pointer', 'Office Supplies', 5, 75.00),
('CA-030', '2023-12-20', '2023-12-26', 'Noah Foster', 'Home Office', 'Desk Mat', 'Office Supplies', 2, 60.00);

SELECT COUNT(*) FROM Superstore_Staging;

INSERT INTO Advisor (name, certification, phone,email,date_joined)
Values ('Alice Morgan','CFA','555-001','alice@finvest.com','2020-01-15');

DESCRIBE Client;

INSERT INTO Client (name, risk_profile, advisor_id)
SELECT DISTINCT customer_name, segment, 1 AS advisor_id
FROM Superstore_Staging;
    
SELECT COUNT(*) FROM Client;

DESCRIBE Portfolio;

INSERT INTO Portfolio (portfolio_name, creation_date, client_id)
VALUES ('Sample Portfolio', CURDATE(), 1);

SELECT * FROM Portfolio;

DESCRIBE Instrument;

INSERT INTO Instrument (name, instrument_type)
SELECT DISTINCT product_name, category
FROM Superstore_Staging;
    
SELECT COUNT(*) FROM Instrument;   
 
DESCRIBE Transactions;

INSERT INTO Transactions (
    portfolio_id,
    instrument_id,
    transactions_type,
    transactions_date,
    quantity,
    trading_price
)
SELECT
    1 AS portfolio_id,
    i.instrument_id,
    'BUY' AS transactions_type,
    s.order_date,
    s.quantity,
    ROUND(s.sales/NULLIF(s.quantity, 0),2)
FROM Superstore_Staging s
JOIN Instrument i
    ON s.product_name = i.name;

SELECT COUNT(*) FROM Transactions;

INSERT INTO Portfolio_Holding (portfolio_id, instrument_id, quantity)
SELECT
	portfolio_id,
	instrument_id,
	SUM(quantity)
FROM Transactions
GROUP BY portfolio_id, instrument_id;

DELIMITER $$

CREATE PROCEDURE Worst_Performing_Portfolio()
BEGIN
	SELECT
		p.portfolio_id,
		p.portfolio_name,
		SUM(ph.quantity) AS value_change_1y
	FROM Portfolio p
	JOIN Portfolio_Holding ph
		ON p.portfolio_id = ph.portfolio_id
	GROUP BY p.portfolio_id, p.portfolio_name
	HAVING p.portfolio_id NOT IN (
		SELECT r.portfolio_id
        FROM Review r
        WHERE r.review_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
    )
	ORDER BY value_change_1y ASC;
END$$
DELIMITER ; 

CALL Worst_Performing_Portfolio();
    
CREATE INDEX idx_transactions_date ON Transactions(transactions_date);
CREATE INDEX idx_price_instrument_data ON Price(instrument_id,price_date);
CREATE INDEX idx_review_date ON Review(review_date);
    
CALL Worst_Performing_Portfolio();