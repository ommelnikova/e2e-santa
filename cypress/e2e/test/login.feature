Feature: User login on santa website

Scenario: User logs in sucessfully
Given user is on secret santa login page
#When user logs in as "gromova_student@eicb.ru" and "Qwerty123!" 
#делаем ниже таблицу из верхней строки
#When user logs in with table
      #| login | password |
      #| gromova_student@eicb.ru  | Qwerty123! |  возвращаем верхнюю строчку кот делали до этого внося некоторые изменения и прорабатываем Examples добавляя внизу
When user logs in as "<login>" and "<password>"
Then user is on dashboard page
Examples:
| login | password |
| gromova_student@eicb.ru | Qwerty123! |
| gromova_student+test1@eicb.ru | Qwerty123! |
| gromova_student+test2@eicb.ru | Qwerty123! |
| gromova_student+test3@eicb.ru | Qwerty123! |
#выше могу ли лог всеми юзерами