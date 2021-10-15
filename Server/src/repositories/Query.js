export const GET_LOCATION = `SELECT id from locations WHERE name= ?`;

export const CREATE_CAFE = `INSERT INTO cafes(cafeID, name, description, logo, locationId)
VALUES(?, ?, ? , ? , ?)`;
export const GET_CAFE_BY_UUID = `SELECT id from cafes WHERE cafeID= ?`;
export const CREATE_EMPLOYEE = `INSERT INTO employees(employeeID, name, days_worked, cafeId)
VALUES(?, ?, ? , ?)`;
export const GET_EMPLOYEE_BY_UUID = `SELECT id from employees WHERE employeeID= ?`;
export const GET_CAFES_BY_LOCATION = `SELECT C.*, count(E.employeeID) as employees, L.name as location  FROM cafes as C INNER JOIN locations as L ON L.id = C.locationId LEFT JOIN demodb.employees as E ON E.cafeId = C.id
WHERE L.name = ? GROUP BY C.cafeID ORDER By employees desc`;

export const GET_ALL_EMPLOYEES = `SELECT C.name as cafe, E.* FROM employees as E INNER JOIN cafes as C ON E.cafeId = C.id ORDER BY E.days_worked desc`
  