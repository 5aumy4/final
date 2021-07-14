# The solution for creating the teams clone, Engage 2021

## Features :
* User Authentication
* Text Chat
* Video Chat
* Mute feature
* Video Off Feature
* Screenshare feature
* Integrated text chat between the video call text chat and the normal text chat (adapt feature)

The challange for this year's Engage Program was to create a teams clone, with basic video calling feature as minimum requirement. The the above is the code that I wrote to try to
implement so and here is the how to guide, and documnetaion about it

## Set up the code on your local machine :
Upon downloading the code on your personal computer, run `npm install` , then `<node server.js>`.</br>
then run `cd main_trial1` (main_trial1 is our frontend/client) and then run `npm install` and `npm start`. </br>
If the packages have been successfully installed on your computer, the application will start running on **localhost:3000**.</br>
On your link bar, type `localhost:3000/login`, and soon you will see the login page.

![log in page](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20222349.png)

Yes, you can click on the `Sign Up` link to create an account but, the application doesn't have options for creating a new team, or adding a user to an existing team.<br>
So, for testing purposes, you may login with `user<i>@gmail.com email` id and `user<i>abc` as the password, where you can `replace <i> by any number that ranges from [1 to 5]`.
<br>
**User 1,2,3,4 are a part of team1 and user1 , 5 are a part of team2.**<br>

So, on signing in you will be directed to a **Welcome page** which has the teams, the logged in user is a part of:

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

**The user gets a call popup only if he/sh is in the same team room as of the calling user**<br>

On accepting the call, the video call will start :
    * The first button facilitates the mic on and off feature <br>
    * The second button facilitates the camera on and off feature <br>
    * The thid button is for screen share <br>
    * The last button enables you to close the meeting <br>
    
![controls](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20223255.png)    

do wait for a few seconds for the call popup to appear, if it doesnt apper, hangup the call on both sides by clicking on the 4th button , refresh the pages on both sides.<br>
Then try again, you should be able to recieve the call.<br>

Also on the right side of the video call window, there is the chat application, which contains the chat history, and stores the chat history created during the call.<br>

On closing the meet, the user is directed to the team page.<br>

The navbar has two options:

![controls](https://github.com/5aumy4/submission_Engage/blob/main/Screenshot%202021-07-13%20223611.png)    

The Home button directs the user to the user home page , where the team buttons can be seen and Logout button logs the user out of the application.<br>
Also, do not forget to logOut after using the application, because without that you won't be able to login or signup again.<br>

