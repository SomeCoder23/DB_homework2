# DB_homework2
A Role-Based Access Control (RBAC) system using TypeORM and Express.js.

---
  To start the application, first clone the repo. Then turn on mysql server on xammp, and make sure you have a db with the same name as the one listed in the db/index.ts file. 
Enter npm run dev in the terminal, your database should be set and ready to receive data now. Go to postman and add permissions and roles via their endpoints, then register the users and assign them roles.
At the end once you get the user with their information, it should look something like this (this is just an example):

```
{
    "page": 1,
    "pageSize": 5,
    "total": 5,
    "items": [
        {
            "id": 1,
            "userName": "Jerry",
            "password": "123894",
            "email": "jerry@gmail.com",
            "profile": {
                "id": 1,
                "firstName": "jerry",
                "lastName": "mouse",
                "dateOfBirth": "2002-12-12"
            },
            "roles": [
                {
                    "id": 2,
                    "name": "Editor",
                    "permissions": [
                        {
                            "id": 1,
                            "name": "create_post"
                        },
                        {
                            "id": 2,
                            "name": "edit_user"
                        },
                        {
                            "id": 4,
                            "name": "view_post"
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "userName": "Tom",
            "password": "hisfhis",
            "email": "tom@gmail.com",
            "profile": {
                "id": 2,
                "firstName": "tom",
                "lastName": "cat",
                "dateOfBirth": "2002-12-12"
            },
            "roles": [
                {
                    "id": 2,
                    "name": "Editor",
                    "permissions": [
                        {
                            "id": 1,
                            "name": "create_post"
                        },
                        {
                            "id": 2,
                            "name": "edit_user"
                        },
                        {
                            "id": 4,
                            "name": "view_post"
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "User",
                    "permissions": [
                        {
                            "id": 1,
                            "name": "create_post"
                        },
                        {
                            "id": 4,
                            "name": "view_post"
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "userName": "SomePerson",
            "password": "blah",
            "email": "person@gmail.com",
            "profile": {
                "id": 3,
                "firstName": "some",
                "lastName": "person",
                "dateOfBirth": "2002-12-12"
            },
            "roles": [
                {
                    "id": 1,
                    "name": "Admin",
                    "permissions": [
                        {
                            "id": 1,
                            "name": "create_post"
                        },
                        {
                            "id": 2,
                            "name": "edit_user"
                        },
                        {
                            "id": 3,
                            "name": "delete_comment"
                        },
                        {
                            "id": 4,
                            "name": "view_post"
                        }
                    ]
                }
            ]
        },
        {
            "id": 4,
            "userName": "Spongebob",
            "password": "boboboby",
            "email": "spongy@gmail.com",
            "profile": {
                "id": 4,
                "firstName": "Sponge",
                "lastName": "Bob",
                "dateOfBirth": "2020-01-01"
            },
            "roles": [
                {
                    "id": 3,
                    "name": "User",
                    "permissions": [
                        {
                            "id": 1,
                            "name": "create_post"
                        },
                        {
                            "id": 4,
                            "name": "view_post"
                        }
                    ]
                }
            ]
        },
        {
            "id": 5,
            "userName": "Lalal",
            "password": "123",
            "email": "lalal@gmail.com",
            "profile": {
                "id": 5,
                "firstName": "lala",
                "lastName": "person",
                "dateOfBirth": "2022-02-01"
            },
            "roles": [
                {
                    "id": 1,
                    "name": "Admin",
                    "permissions": [
                        {
                            "id": 1,
                            "name": "create_post"
                        },
                        {
                            "id": 2,
                            "name": "edit_user"
                        },
                        {
                            "id": 3,
                            "name": "delete_comment"
                        },
                        {
                            "id": 4,
                            "name": "view_post"
                        }
                    ]
                }
            ]
        }
    ]
}
```
