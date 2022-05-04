# Модель прецедентів

Цей документ містить в собі опис основних сценаріїв роботи системи.

Вбудовування зображень діаграм здійснюється з використанням сервісу [UML Editor](https://jace-dev.herokuapp.com/design/uml-editor#/).

В markdown-файлі використовується опис діаграми.

## Діаграма прецедентів

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    skinparam actorStyle awesome
    actor User
    actor AuthorizedUser
    actor OrganizationManager

    usecase "<b>AUTH\nЗареєструватись та авторизуватись" as AUTH
    usecase "<b>USER\nОтримати та пройти опитування" as USER
    usecase "<b>QUIZ\nСтворити, отримати результати,\nзавершити та згенерувати опитування" as Manager

    AuthorizedUser -u-|> User
    OrganizationManager -u-|> AuthorizedUser

    User -r-> AUTH
    AuthorizedUser -r-> USER
    OrganizationManager -r-> Manager

@enduml

 </center>
<br><br>

## Схеми використання для користувача

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    skinparam actorStyle awesome
    actor User

    usecase "<b>AUTH\nЗареєструватись та авторизуватись" as AUTH
    usecase "<b>AUTH.001\nЗареєструватись у системі" as Register
    usecase "<b>AUTH.002\nАвторизуватись у системі" as Authorize

    User -r-> AUTH
    Register .u.> AUTH : extends
    Authorize .u.> AUTH : extends

@enduml

</center>
<br><br>

## Схеми використання для авторизованого користувача

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    skinparam actorStyle awesome
    actor AuthorizedUser

    usecase "<b>USER\nОтримати та пройти опитування" as USER
    usecase "<b>USER.001\nОтримати дані для проходження опитування" as GetData
    usecase "<b>USER.002\nОтримати зворотній зв'язок \nстосовно надісланого опитування" as GetREVIEW

    AuthorizedUser -r-> USER
    GetData .u.> USER : extends
    GetREVIEW .u.> USER : extends

@enduml

</center>
<br><br>

## Схеми використання для менеджера організації

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    skinparam actorStyle awesome
    actor OrganizationManager

    usecase "<b>USER\nСтворити, отримати результати,\nзавершити та згенерувати опитування" as QUIZ
    usecase "<b>USER.001\nСтворити опитування" as CreatePoll
    usecase "<b>USER.002\nОтримати результати опитування" as GetResults
    usecase "<b>USER.003\nЗавершити опитування" as FinishSurvey
    usecase "<b>USER.004\nЗгенерувати нове опитування\nна основі завершеного" as GeneratePoll

    OrganizationManager -r-> QUIZ
    CreatePoll .d.> QUIZ : extends
    GetResults .d.> QUIZ : extends
    FinishSurvey .u.> QUIZ : extends
    GeneratePoll .u.> QUIZ : extends

@enduml

</center>
<br><br>

## Сценарії використання для користувача

- ID: v1.AUTH.001

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.AUTH.001
        <font color=000 size=14><b>Назва:</b> Зареєструватись у системі
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач не зареєстрований у системі
        <font color=000 size=14><b>Результат:</b> Новий обліковий запис
        <font color=000 size=14><b>Виключні ситуації:</b> v1.AUTH.EX.001

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Натискає кнопку "Реєстрація";
        : Передає реєстраційні дані;
    |Система|
        : Перевіряє передані
        реєстраційні дані;
        note right #ffaaaa
        <b> Можлива
        <b> v1.AUTH.EX.001
        end note

        : Створює обліковий
        запис за переданими
        реєстраційними даними;

        : Надає користувачу
        інформацію про створення
        облікового запису;

    |Користувач|
        stop;

@enduml

</center>

- ID: v1.AUTH.002

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.AUTH.002
        <font color=000 size=14><b>Назва:</b> Авторизуватись у системі
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач зареєстрований у системі
        <font color=000 size=14> Користувач не авторизований у системі
        <font color=000 size=14><b>Результат:</b> Авторизація у системі
        <font color=000 size=14><b>Виключні ситуації:</b> v1.AUTH.EX.002
        <font color=000 size=14> v1.AUTH.EX.003

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

        |Користувач|
        start
        : Натискає кнопку "Вхід";
        : Передає авторизаційні дані;
        |Система|
        : Ідентифікує користувача;
        note right #ffaaaa
        <b> Можлива
        <b> v1.AUTH.EX.002
        end note

        : Авторизує користувача;
        note right #ffaaaa
        <b> Можлива
        <b> v1.AUTH.EX.003
        end note

        : Надає користувачу доступ
        до облікового запису;
    |Користувач|
        stop;

@enduml

</center>
<br><br>

## Сценарії використання для авторизованого користувача

- ID: v1.USER.001

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.USER.001
        <font color=000 size=14><b>Назва:</b> Отримати дані для проходження опитування
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач перейшов за посиланням до опитування
        <font color=000 size=14><b>Результат:</b> Дані для проходження опитування
        <font color=000 size=14><b>Виключні ситуації:</b> v1.COMMON.EX.001

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Натискає кнопку
        "Пройти опитування";
    |Система|
        : Знаходить дані про опитування;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.001
        end note

        : надає користувачу дані для
        проходження опитування;

    |Користувач|
        stop;

@enduml

</center>

- ID: v1.USER.002

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.USER.002
        <font color=000 size=14><b>Назва:</b> Отримати зворотній зв'язок стосовно надісланого опитування
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач має доступ до запитаного опитування
        <font color=000 size=14> Користувач коректно пройшов опитування
        <font color=000 size=14> У системі є дані про зворотній зв'язок стосовно опитування
        <font color=000 size=14><b>Результат:</b> Зворотній зв'язок стосовно надісланого опитування
        <font color=000 size=14><b>Виключні ситуації:</b> v1.AUTH.EX.004
        <font color=000 size=14> v1.COMMON.EX.001
        <font color=000 size=14> v1.COMMON.EX.002
        <font color=000 size=14> v1.COMMON.EX.003


        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Натискає кнопку
        "Завершити опитування";
    |Система|
        : Перевіряє, чи існує задане опитування;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.001
        end note

        : Перевіряє, чи існує відповідь
        саме цього користувача;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.003
        end note

        : Надає користувачу дані про зворотній
        зв'язок стосовно опитування;

    |Користувач|
        stop;

@enduml

</center>
<br><br>

## Сценарії для менеджера організацій

- ID: v1.QUIZ.001

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.QUIZ.001
        <font color=000 size=14><b>Назва:</b> Створити опитування
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач авторизований у системі
        <font color=000 size=14><b>Результат:</b> Створене опитування
        <font color=000 size=14><b>Виключні ситуації:</b> v1.AUTH.EX.004
        <font color=000 size=14> v1.COMMON.EX.001
        <font color=000 size=14> v1.COMMON.EX.002
        <font color=000 size=14> v1.COMMON.EX.003

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Авторизується в системі;
        : Відкриває форму для
        створення опитування;
    |Система|
        : Надає форму створення
        опитування користувачу;

    |Користувач|
        : Заповнює форму запиту;
        : Натискає кнопу
        "Надіслати запит";
    |Система|
        : Ідентифікує користувача;
        note right #ffaaaa
        <b> Можлива
        <b> v1.AUTH.EX.004
        end note

        : Перевіряє правильність
        надісланих даних;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.003
        end note

        : Створює опитування;
        : Система надсилає користувачу
        повідомлення про створення
        опитування (з інформацією
        як його поширити);

    |Користувач|
        stop;

@enduml

</center>

- ID: v1.QUIZ.002

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.QUIZ.002
        <font color=000 size=14><b>Назва:</b> Отримати результати опитування
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач авторизований у системі
        <font color=000 size=14> Користувач має доступ до запитаного опитування
        <font color=000 size=14><b>Результат:</b> Результати опитування
        <font color=000 size=14><b>Виключні ситуації:</b> v1.AUTH.EX.004
        <font color=000 size=14> v1.COMMON.EX.001
        <font color=000 size=14> v1.COMMON.EX.002
        <font color=000 size=14> v1.COMMON.EX.003

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Авторизується у системі;
        : Відкриває форму запиту
        результатів опитування;
    |Система|
        : Надає користувачу форму для
        отримання результатів опитування;
    |Користувач|
        : Натискає на кнопку
        "Надіслати запит";
    |Система|
        : Отримує запит від користувача;
        : Ідентифікує користувача;
        note right #ffaaaa
        <b> Можлива
        <b> v1.AUTH.EX.004
        end note

        : Знаходить дані про опитування;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.001
        end note

        : Авторизує користувача для
        отримання результатів опитування;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.002
        <b> v1.COMMON.EX.003
        end note

        : Надсилає користувачу результати опитування;

    |Користувач|
        stop;

@enduml

</center>

- ID: v1.QUIZ.003

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.QUIZ.003
        <font color=000 size=14><b>Назва:</b> Завершити опитування
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач авторизований у системі
        <font color=000 size=14> Користувач має доступ до запитаного опитування
        <font color=000 size=14><b>Результат:</b> Опитування завершено
        <font color=000 size=14><b>Виключні ситуації:</b> v1.AUTH.EX.004
        <font color=000 size=14> v1.COMMON.EX.001
        <font color=000 size=14> v1.COMMON.EX.002

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Авторизується в системі;
        : Відкриває форму запиту
        завершення опитування;
    |Система|
        : Надає форму для завершення
        опитування користувачу;

    |Користувач|
        : Натискає кнопу
        "Завершити опитування";
    |Система|
        : Ідентифікує користувача;
        note right #ffaaaa
        <b> Можлива
        <b> v1.AUTH.EX.004
        end note

        : Знаходить дані про опитування;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.001
        end note

        : Авторизує користувача для
        завершення опитування;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.001
        end note

        : Надсилає користувачу
        інформацію про успішність.;

    |Користувач|
        stop;

@enduml

</center>

- ID: v1.QUIZ.004

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.QUIZ.004
        <font color=000 size=14><b>Назва:</b> Згенерувати нове опитування на основі завершеного
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач авторизований у системі
        <font color=000 size=14> Користувач має доступ до запитаного опитування
        <font color=000 size=14> Попереднє опитування завершене
        <font color=000 size=14> Завершене опитування підпадає під один з шаблонів для генерації нових
        <font color=000 size=14><b>Результат:</b> Нове швидко створене опитування
        <font color=000 size=14><b>Виключні ситуації:</b> v1.AUTH.EX.004
        <font color=000 size=14> v1.COMMON.EX.001
        <font color=000 size=14> v1.COMMON.EX.002
        <font color=000 size=14> v1.COMMON.EX.003

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Авторизується в системі;
        : Відкриває форму запиту
        генерації опитування;
    |Система|
        : Надає форму для генерації
        опитування користувачу;

    |Користувач|
        : Натискає кнопу
        "Згенерувати опитування";
    |Система|
        : Ідентифікує користувача;
        note right #ffaaaa
        <b> Можлива
        <b> v1.AUTH.EX.004
        end note

        : Знаходить дані про опитування;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.001
        end note

        : Авторизує користувача для
        генерації опитування;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.002
        end note

        : Генерує нове опитування;
        note right #ffaaaa
        <b> Можлива
        <b> v1.COMMON.EX.003
        end note

        : Надсилає користувачу
        інформацію про успішність;

    |Користувач|
        stop;

@enduml

</center>
<br><br>

## Виключні випадки

- ID: v1.AUTH.EX.001

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.AUTH.EX.001
        <font color=000 size=14><b>Назва:</b> Відхилити запит на реєстрацію
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач не зареєстрований у системі
        <font color=000 size=14> Клієнт надіслав уже існуючі у системі дані
        <font color=000 size=14><b>Результат:</b> Відповідне повідомлення про відхилення реєстрації

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Вводить не вірні
        дані при реєстрації;

    |Система|
        : Надає користувачу повідомлення
        про відхилення реєстрації;

    |Користувач|
        : Отримує повідомлення про
        відхилення реєстрації;
        : Завершує взаємодію;
        stop;

@enduml

</center>

- ID: v1.AUTH.EX.002

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.AUTH.EX.002
        <font color=000 size=14><b>Назва:</b> Відхилити спробу авторизації через помилку ідентифікації
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач не авторизований у системі
        <font color=000 size=14> Система не змогла ідентифікувати користувача
        <font color=000 size=14><b>Результат:</b> Повідомлення про помилку спроби авторизації

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Будучи неідентифікованим, виконує
        дію що потребує авторизації;

    |Система|
        : Надає користувачу повідомлення
        про відхилення авторизації
        через помилку ідентифікації;

    |Користувач|
        : Отримує повідомлення про
        відхилення авторизації через
        помлку ідентифікації.;
        : Завершує взаємодію;
        stop;

@enduml

</center>

- ID: v1.AUTH.EX.003

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.AUTH.EX.003
        <font color=000 size=14><b>Назва:</b> Відхилити спробу авторизації через помилку аутентифікації
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач не авторизований у системі
        <font color=000 size=14> Система не змогла аутентифікувати користувача
        <font color=000 size=14><b>Результат:</b> Повідомлення про спроби авторизації

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Будучи неаутенфікованим, виконує
        дію що потребує авторизації;

    |Система|
        : Надає користувачу повідомлення
        про відхилення авторизації
        через помилку аутентифікації;
        : При спробі аутентифікації
        у цій сесії також змусить
        користувача пройти капчю;

    |Користувач|
        : Отримує повідомлення про
        відхилення авторизації через
        помилку аутентифікації;
        : Завершує взаємодію;
        stop;

@enduml

</center>

- ID: v1.AUTH.EX.004

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.AUTH.EX.004
        <font color=000 size=14><b>Назва:</b> Відхілити доступ для неавторизованого користувача
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач не авторизований у системі
        <font color=000 size=14> Система відхилила запит неавторизованого користувача
        <font color=000 size=14><b>Результат:</b> Повідомлення про відхиленя доступу для неавторизованого користувача

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Будучи неавторизованим
        запитує доступ;

    |Система|
        : Надає користувачу повідомлення
        про відхиленя доступу для
        неавторизованого користувача;

    |Користувач|
        : Отримує повідомлення про
        відхиленя доступу для
        неавторизованого користувача;
        : Завершує взаємодію;
        stop;

@enduml

</center>

- ID: v1.COMMON.EX.001

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.COMMON.EX.001
        <font color=000 size=14><b>Назва:</b> Повідомити про відсутність запитаних даних
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач авторизований у системі
        <font color=000 size=14> Користувач запитав дані, що відсутні у системі
        <font color=000 size=14><b>Результат:</b> Повідомлення про відсутність запитаних даних
        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Надсилає запит на отримання
        неіснуючих даних;

    |Система|
        : Надає користувачу повідомлення
        про про відсутність запитаних даних;

    |Користувач|
        : Отримує повідомлення про
        відсутність запитаних даних;
        : Завершує взаємодію;
        stop;

@enduml

</center>

- ID: v1.COMMON.EX.002

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.COMMON.EX.002
        <font color=000 size=14><b>Назва:</b> Відхилити доступ користувача до даних
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Система відхилила запит користувача до даних
        <font color=000 size=14> Користувач запитав дані, що відсутні у системі
        <font color=000 size=14><b>Результат:</b> Повідомлення про відхилення доступу до даних

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Надсилає запит на отримання доступу
        до недоступних йому даних;

    |Система|
        : Надає користувачу повідомлення
        про відхилення доступу до даних;

    |Користувач|
        : Отримує повідомлення про
        відхилення доступу до даних;
        : Завершує взаємодію;
        stop;

@enduml

</center>

- ID: v1.COMMON.EX.003

<center style="border-radius:4px; border: 1px solid #cfd7e6; box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025); padding: 1em;">

@startuml

    left header
        <font color=000 size=14><b>ID:</b> v1.COMMON.EX.002
        <font color=000 size=14><b>Назва:</b> Відхилити хибні дані
        <font color=000 size=14><b>Учасники:</b> Користувач, Система
        <font color=000 size=14><b>Передумови:</b> Користувач авторизований у системі
        <font color=000 size=14> Користувач надіслав у систему хибні дані
        <font color=000 size=14><b>Результат:</b> Повідомлення про відхилення хибних даних

        <font color=000 size=14><b>Основний сценарій:</b>

    end header

    |Користувач|
        start
        : Надсилає до системи
        хибні дані;

    |Система|
        : Надає користувачу повідомлення
        про відхилення хибних даних;

    |Користувач|
        : Отримує повідомлення про
        відхилення хибних даних;
        : Завершує взаємодію;
        stop;

@enduml

</center>
