# hacktivoverflow

simple clone of stackoverflow made using express, mongodb/mongoose and vue js

## List of user routes:

Route            | HTTP   | Request                     | Response
---------------- | ------ | --------------------------- | ----------------------------------------------------
user/register    | POST   | body(name:String, email:String, password:String) | On success a new user will be created in the                                                                    database, an error will be shown if fail
user/login       | POST   | body(email:String, password:String)       | On success a token will be generated in local                                                                   storage, an error will be shown if fail, example token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

## List of question routes:

Route            | HTTP   | Request                     | Response
---------------- | ------ | --------------------------- | ----------------------------------------------------
question       | GET    | none                        | Returns all questions in the collection as an object which is also deeply populated (populates answers, user data in answers, and user data in question)
question        | POST   | header(access_token) body(title:String, description:String, upvotes:[ User ObjectId ], downvotes:[ User ObjectId ], answers:[ Answer ObjectId ], isAnswered:Boolean, tags:[ String(enum: ['javascript', 'html', 'css', 'mongoose', 'mongodb']) ], user:ObjectId, createdAt:Date) | On success a new question document will be created in the collection database and returned as a deeply populated object, an error will be returned if validation failed
question/mylist  | GET    | header(access_token)        | Returns all questions that is created by the user
question/:id     | PUT    | header(access_token) body(title:String, description:String, upvotes:[ User ObjectId ], downvotes:[ User ObjectId ], answers:[ Answer ObjectId ], isAnswered:Boolean, tags:[ String(enum: ['javascript', 'html', 'css', 'mongoose', 'mongodb']) ], user:ObjectId, createdAt:Date) | Updates a specific question with new value
question/:id/addAnswer | PUT | header(access_token) body(answer:ObjectId) | Adds an answer ObjectId to a specific question's answers array and returns the question question
question/:id/upvote | PUT | header(access_token) | Adds an user ObjectId to a specific question's upvotes array and returns the updated question
question/:id/downvote | PUT | header(access_token) | Adds an user ObjectId to a specific question's downvotes array and returns the updated question
question/:id/cancelUpvote | PUT | header(access_token) | Removes an user ObjectId from a specific question's upvotes array and returns the updated question
question/:id/cancelDownvote | PUT | header(access_token) | Removes an user ObjectId from a specific question's downvotes array and returns the updated question
question/:id | DELETE | header(access_token) | Removes a specific question from a collection and also all answers related to the question

## List of answer routes:

Route            | HTTP   | Request                     | Response
---------------- | ------ | --------------------------- | ----------------------------------------------------
answer        | GET    | none                        | Returns all answers in the collection as an object
answer        | POST   | header(access_token) body(title:String, description:String, upvotes:[ User ObjectId ], downvotes:[ User ObjectId ], question:ObjectId, isAccepted:Boolean, user:ObjectId, createdAt:Date) | On success a new answer document will be created in the collection database and returned as an object, an error will be returned if validation failed
answer/mylist  | GET    | header(access_token)        | Returns all answers that is created by the user
answer/:id     | PUT    | header(access_token) body(title:String, description:String, upvotes:[ User ObjectId ], downvotes:[ User ObjectId ], question:ObjectId, isAccepted:Boolean, user:ObjectId, createdAt:Date) | Updates a specific answer with new value and returns the updated answer
answer/:id/upvote | PUT | header(access_token) | Adds an user ObjectId to a specific answer's upvotes array and returns the updated answer
answer/:id/downvote | PUT | header(access_token) | Adds an user ObjectId to a specific answer's downvotes array and returns the updated answer
answer/:id/cancelUpvote | PUT | header(access_token) | Removes an user ObjectId from a specific answer's upvotes array and returns the updated answer
answer/:id/cancelDownvote | PUT | header(access_token) | Removes an user ObjectId from a specific answer's downvotes array and returns the updated answer
answer/:id/accept | PUT | header(question owner's access_token) | Updates a specific answer's isAccepted field to true and returns the updated answer