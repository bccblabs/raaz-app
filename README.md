Design Document for Raaz Mobile Application
========================================================================
1. API Endpoints

 POST /trims

    - Filter stockCar type and aggregate by models/generations
    - has_child filter
    - src/reducers/tuning

 POST /trims/builds

    - Filter buildCars and show all documents
    - has_parent filter
    - src/reducers/tuning/builds

 POST /trims/parts

    - Filter buildCars and show all documents
    - has_parent filter
    - src/reducers/tuning/parts

  POST /makeModelTrims
    - Prefiltered make and models

 POST /authenticate

    - use eb to launch

 GET /posts

 POST /posts

 DELETE /posts

 GET /post/comments

 POST /post/comments

 DELETE /post/comments

 GET /user

 GET /user/posts

 GET /user/followers

 POST /user/addFollower

 GET /user/followers/posts
