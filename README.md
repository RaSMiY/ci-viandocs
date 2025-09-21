# CiViandocs - Описание

Приложение для просмотра документов и добавления аннотаций.

## Диаграмма компонентов

@startuml

allowmixing

skinparam component {
borderColor Purple
backgroundColor SkyBlue
backgroundColor<<main component>> #cbc6b8ff
backgroundColor<<Map>> #22AAb8ff
backgroundColor<<Service>> #a782ffff
}

skinparam node {
backgroundColor #76ff7688
}

component HeaderComponent {
() zoomIn
() zoomOut
() save
}

component ViewAnnotateComponent <<main component>> {
component NoteComponent {
component ViewAnnotateService <<Service>> {
node doc <<Doc>> {
json Doc {
"name": "string",
"pages": "Page[]",
"notes?": "Note[]"
}
json Page {
"number": "number",
"imageUrl": "string"
}
}
node notes <<Map>> {
json Note {
"id": "number",
"relPos": "Position",
"text": "string"
}
json Position {
"top": "number",
"left": "number"
}
}
() getConvertedPosition
() zoom
}
() updatePosition
() storeNotePosition
action startDrag
}
() addAnnotation
}

note bottom of HeaderComponent
Верхняя панель приложения с кнопками управления
и ссылками на страницу автора и репозиторий
end note
note top of ViewAnnotateComponent
Главный компонент, содержащий контейнер документа,
относительно которого вычисляются положения заметок.

При нажатии на любое место в документе в этом
месте появляется заметка, в режиме редактирования.
В этом режиме её можно перемещать и менять содержание.
Также можно переключить режим и тогда её нельзя будет
редактировать и перемещать.
При перемещении заметки происходит вызов функции startDrag,
в которой осуществляется подписка на интересующие
события - перемещения указателя и отпускание кнопки. При
перемещении указателя положение заметки обновляется и
сохраняется в реестре (переменной notes в ViewAnnotateService)
end note
note top of NoteComponent
Компонент заметки. Содержит кнопки управления
режимом и положением заметки.
end note
note bottom of ViewAnnotateService
Служба, через которую взаимодействуют компоненты.
end note

zoomIn -[dashed,#0088DD]-> zoom
zoomOut -[dashed,#0088DD]-> zoom
zoom -[dashed,#0088DD]-> updatePosition
zoom -[dashed,#0088DD]-> updatePosition

save -[dashed,#purple]-> ViewAnnotateService

ViewAnnotateComponent -[#green]- doc
ViewAnnotateComponent -[dashed,#blue]-> addAnnotation
addAnnotation -[dashed,#blue]-> Note
Note --> getConvertedPosition
getConvertedPosition --> Position
startDrag -up-> storeNotePosition
storeNotePosition -[dashed]- notes

@enduml

## Плюсы

Сравнительно простой способ создания и редактирования заметок. Без подключения рендерера и фабрики компонентов.

## Минусы

Кнопки управления заметкой довольно крупные и не выглядят гармонично. Необходимо настроить размер.

Координаты заметок хранятся для масштаба 100% с округлением. При изменении масштаба происходит пересчёт координат для текущего масштаба, также с округлением значений. При большой высоте контейнера это приводит к погрешностям в рассчитанном положении заметки - она слегка смещается относительно первоначального положения.
Для того, чтобы это исправить, необходимо хранить координаты заметок для 100%-го масштаба без округлений.

# Техническа часть

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
