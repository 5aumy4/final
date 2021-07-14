# The solution for creating the teams clone, Engage 2021

The challange for this year's Engage Program was to create a teams clone, with basic video calling feature as minimum requirement. The the above is the code that I wrote to try to
implement so and here is the how to guide, and documnetaion about it,

## Set up the code on your local machine :
upon downloading the code on your personal computer, run <npm install> , then <node server.js>
then run <cd main_trial1> (main_trial1 is our frontend/client) and then run <npm install> and <npm start>
If the packages have been successfully installed on your computer, the application will start running on **localhost:3000**
On your link bar, type <localhost:3000/login>, and soon you will see the login page.

![log in page](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20222349.png)

Yes, you can click on the Sign Up link to create an account but, since the application doesn't have options for creating a new team, or adding a user to an existing team.
So, for testing purposes, you may login with user<i>@gmail.com email.id and user<i>abc as the password, where you can replace <i> by any number that ranges from [1 to 5].
User 1,2,3,4 are a part of team1 and user1 , 5 are a part of team2.

So, on signing in you will be directed to a Welcome page which has the teams, the logged in user is a part of:

![welcome page](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20222713.png)

On clicking on any of the team button, the user will gt directed to the teams page of the team.
It will have the following feature :

![chat](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20222855.png)

on clicking the blue dropdown, the names of all the participants of the particular team would show up:

![list](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20222937.png)

You can click any of these users and see your chat history with them.

Also, click on the purple button to start a video call with them.

They will recieve the following popup :

![popup](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20223052.png)

On accepting the call, the video call will start :
    * The first button facilitates the mic on and off feature
    * The second button facilitates the camera on and off feature
    * The thid button is for screen share
    * The last button enables you to close the meeting
    
![controls](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20223255.png)    

Also on the right side, there is the chat application, which contains the chat history, and stores the chat history created during the call.

On closing the meet, the user is directed to the team page.

The navbar has two options:

![controls](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20223611.png)    

The Home button directs the user to the user home page , where the team buttons can be seen and Logout button logs the user out of the application.
Also, do not forget to logOut after using the application, because without that you won't be able to login or signup again.

