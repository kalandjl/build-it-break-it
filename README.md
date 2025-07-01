# Build it Break it
## Description
This project was intended as a way to understand full-stack cybersecurity in an interactive way. I first created a full-stack MYSQL Next.js application, with token authentication and a REST API. Once I had the app running, my goal was to exploit it using basic vulnerabilities that were purpously not accounted for.

## Exploits
### SQL Injection
Using the sqlmap tool, I was able to gain complete access to the sql database from the outside. At first, my app was TOO secure for the tool to work - I had the remove the /login's parameter checking to allow for malicious inputs to infiltrate the database through SQL queries. What I learned was the importance of thouroughness while coding backend SQL injection code; always use a function that takes in a prompt and parameters, not just a prompt. 