cd ../sqlmap-dev

python sqlmap.py -u "http://localhost:4000/api/auth/login" --method POST --data='{"email":"admin@gmail.com","password":"*"}' --headers="Content-Type: application/json" --risk=3 --level=5 --dbs --ignore-code=401