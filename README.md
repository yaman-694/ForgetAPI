- host link https://task1-kvhj.onrender.com

-----
## Endpoints

### Register

- `/api/v1/signup`

### Login

- `/api/v1/login`

### Forget Password

- `/api/v1/forget`

### ResetToken

You will get a link on mail
https://task1-kvhj.onrender.com/reset-token/:id/:token paste from mail

### post
-- for below api use local project setup on your system
- .env file
```
PORT=3000
MONGO_DB = mongodb://127.0.0.1:27017/task1
TOKEN_HEADER_KEY= thisismyfakekeywhythisissogood
USER_NAME= email@gmail.com
PASSWORD= password
```
- `/api/v1/upload` to upload the post user form-data name as ( image ) as shown in video

- `/api/v1/delete/:id` to delete the post replace :id with postId which is to be deleted

- `/api/v1/like/:postId` to like post user must be logged in firsta and replace postId with post on which user liked

- `/api/v1/comment/:postId` to add a comment on the user post pass comment in x-www-form-urlencoded format and name of the field to be comment as shown in video

