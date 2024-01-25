Feature: User logins, create a box and add participants on santa website

    Scenario: User logs and create box in sucessfully
        Given user is on secret santa login page
        Given user logs in with table
            | login                         | password   |
            | gromova_student@eicb.ru       | Qwerty123! |
            | gromova_student+test1@eicb.ru | Qwerty123! |
            | gromova_student+test2@eicb.ru | Qwerty123! |
            | gromova_student+test3@eicb.ru | Qwerty123! |
        # Given user is on dashboard page
        # When title have text Come up with box name
        # When naming a box
        # When save new box id
        # When user is on cover selection page
        # When user select a cover box
        # When user is on gift price toggle page
        # When checkbox on
        # When user sets the max gift amount
        # When user select currency
        # When user is on advanced setting page
        # When select advanced setting on page
        # When user is on new box page
        # Then check name new box on the page
        # Then check title on the new box  page
        # Then user is on add participants page
        # Then copy link
        Then log out

