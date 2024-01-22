Feature: User logins, create a box and add participants on santa website

Scenario: User logs and create box in sucessfully 
Given user is on secret santa login page
Given user logs in with table
| login | password | 
| gromova_student@eicb.ru | Qwerty123! |
| gromova_student+test1@eicb.ru | Qwerty123! |
| gromova_student+test2@eicb.ru | Qwerty123! |
| gromova_student+test3@eicb.ru | Qwerty123! |
Given user is on dashboard page
When title have text Come up with box name
When naming a box
When save new box id
When user is on cover selection page
When user select a cover box
When user is on gift price toggle page
When checkbox on
When user sets the max gift amount
When user select currency
When user is on advanced setting page
When select advanced setting on page
When user is on new box page
Then check name new box on the page
Then check title on the new box  page
Then user is on add participants page
Then copy link
Then log out

Scenario: Add user through link. User1 goes by invition and fills out the form 
Given following a link
Given user logs through click on the create participant card button
Given user on login page
Given user logs
| login | password |
| gromova_student@eicb.ru | Qwerty123! |
| gromova_student+test1@eicb.ru | Qwerty123! |
| gromova_student+test2@eicb.ru | Qwerty123! |
| gromova_student+test3@eicb.ru | Qwerty123! |
Given user create participant card
Given field name have val userName1
| login | password | name |
| gromova_student@eicb.ru | Qwerty123! | gromova_student |
| gromova_student+test1@eicb.ru | Qwerty123! | gromova_student1 |
| gromova_student+test2@eicb.ru | Qwerty123! | gromova_student2 |
| gromova_student+test3@eicb.ru | Qwerty123! | gromova_student3  |
Given add phone
Given user select avatar
Given user add street address, firstName, zipCode
Given user add wishes
Given participant card created 
Given sign out

Scenario: User add user2 and user3 through drawing of lots
 Given user log in
Given user logs in with data
| login | password |
| gromova_student@eicb.ru | Qwerty123! |
| gromova_student+test1@eicb.ru | Qwerty123! |
| gromova_student+test2@eicb.ru | Qwerty123! |
| gromova_student+test3@eicb.ru | Qwerty123! |
Given user is on page created boxes
Given user is on page created new box
Given user is on page add participants
Given user add user1 and user2 into input fields
Given checkbox enabled
Given user is on drawing lots page
Given user drew lots
Given logged out

Scenario: User delet new box
Given user is on login page
Given user logs in with data table
| login | password |
| gromova_student@eicb.ru | Qwerty123! |
| gromova_student+test1@eicb.ru | Qwerty123! |
| gromova_student+test2@eicb.ru | Qwerty123! |
| gromova_student+test3@eicb.ru | Qwerty123! |
Given user delete new box


