## Register and LogIn User with JWT Token

1. npm install bcryptjs cookie-parser dotenv
2. npm install mongoose express nodemon
3. npm install jsonwebtoken

---

### Check on PostMan

- http://localhost:3000/register
- http://localhost:3000/login

---

```
   Verify JWT token

   1. grab token from coookie
   2. if no token,stop there
   3. if token present, decode the token,get id
   4. query to DB for that user id

```
