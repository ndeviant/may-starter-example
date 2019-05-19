![twig-bem-starter](https://i.imgur.com/0AG0txq.png)

# twig-bem-starter

## Особенности

- сборка предназначена для автоматизации задач в повседневной front-end разработке
- именование классов по [БЭМ](https://ru.bem.info/)
- использование шаблонизатора [twig](https://twig.symfony.com/)
- использование препроцессора [SCSS](https://sass-lang.com/)
- использование транспайлера [Babel](https://babeljs.io/) для поддержки современного JavaScript (ES6) в браузерах
- использование [Webpack](https://webpack.js.org/) для сборки JavaScript-модулей

## Установка

- установите [Yarn](https://yarnpkg.com/en/docs/install)

> Yarn - это современная альтернатива npm. Yarn работает с тем же файлом `package.json` и так же скачивает необходимые модули в папку `node_modules`, но делает это намного быстрее.

- скачайте сборку: `git clone https://github.com/ndeviant/twig-bem-starter.git`
- установите `gulp` и `bem-tools-create` глобально: `yarn global add gulp-cli bem-tools/bem-tools-core bem-tools/bem-tools-create`
- перейдите в скачанную папку со сборкой: `cd twig-bem-starter`
- скачайте необходимые зависимости: `yarn`
- чтобы начать работу, введите команду: `yarn start` (режим разработки)
- чтобы собрать проект, введите команду `yarn build` (режим сборки)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером.
Режим сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер.

## Файловая структура

```
twig-bem-starter
├── dist
├── src
│   ├── components
│   ├── fonts
│   ├── images
│   │   ├── svg
│   │   └── media
│   ├── js
│   ├── sass
│   ├── views
│   └── .htaccess
├── gulpfile.babel.js
├── gulp.options.js
├── webpack.config.babel.js
├── package.json
├── template.data.js
├── .babelrc.js
├── .bemrc.js
├── .eslintrc.json
├── .gitignore
├── .prettierrc.js
└── .stylelintrc.js
```

- Корень папки:
  - `.babelrc.js` — настройка ES6
  - `.bemrc.js` — настройка БЭМ
  - `.eslintrc.js` — настройка ESLint
  - `.prettierrc.js` — настройка ESLint
  - `.stylelintrc.js` — настройка Stylelint
  - `.gitignore` – запрет на отслеживание файлов Git'ом
  - `gulpfile.babel.js` — задачи Gulp
  - `gulp.options.js` — настройки Gulp
  - `template.data.js` — Данные для шаблонов
  - `webpack.config.js` — настройки Webpack `package.json` — список зависимостей
- Папка `src` - используется во время разработки:
  - БЭМ-блоки и компоненты: `src/components`
  - шрифты: `src/fonts`
  - изображения: `src/images`
  - JS-файлы: `src/js`
  - SCSS-файлы: `src/styles`
  - Twig-файлы: `src/views`
  - страницы сайта: `src/views/pages`
  - конфигурационный файл веб-сервера Apache с настройками [gzip](https://habr.com/ru/post/221849/) (сжатие без потерь): `src/.htaccess`
- Папка `dist` - папка, из которой запускается локальный сервер для разработки (при запуске `yarn run dev`)

## Рекомендации по использованию

- придерживайтесь изначальной структуры папок и файлов
- придерживайтесь компонентного подхода к разработке сайтов
  - каждый БЭМ-блок имеет свою папку внутри `src/components/modules`
  - папка одного БЭМ-блока содержит в себе один Twig-файл, один SCSS-файл и один JS-файл (если у блока используется скрипт)
  - SCSS-файл блока импортируется в файл `src/components/modules/_modules.scss`, который в свою очередь импортируется в файл `src/styles/main.scss` JS-файл блока импортируется в `src/js/import/modules.js`, который в свою очередь импортируется в файл `src/js/index.js`
- компоненты (например, иконки, кнопки) оформляются в Twig с помощью примесей
  - каждый компонент имеет свою папку внутри `src/components/components`
  - папка одного компонента содержит в себе один Twig-файл, один SCSS-файл и один JS-файл
  - Twig-файл компонента импортируется в файл `src/views/layouts/default.htm`, который в свою очередь импортируется в файл `src/views/index.htm`
  - SCSS-файл компонента импортируется в файл `src/components/components/_components.scss`, который в свою очередь импортируется в файл `src/styles/main.scss` JS-файл компонента импортируется в файл `src/js/import/components.js`, который в свою очередь импортируется в файл `src/js/index.js`
- из всех SCSS-файлов компилируется только `main.scss`. Остальные стилевые файлы импортируются в него
- страницы сайта находятся в папке `src/pages`
  - каждая страница (в том числе главная) наследует шаблон `src/views/layouts/default.htm`
  - главная страница: `src/views/index.htm`
- шрифты находятся в папке `src/fonts`
- изображения находятся в папке `src/images` изображение для генерации фавиконок должно находиться в папке `src/images` и иметь размер не менее `100px x 100px`.
- иконки из папки `src/images/svg` собираются в один svg спрайт `dist/assets/images/sprite.svg`.
- картинки которые в последствии будут грузится из CMS класть в папку `src/images/media`.
- все сторонние библиотеки устанавливаются в папку `node_modules`
  - для их загрузки воспользуйтеcь командой `yarn add package_name`
  - для подключения JS-файлов библиотек импортируйте их в JS-файл БЭМ-блока (то есть тот БЭМ-блок, который использует скрипт), например:
    `javascript import $ from "jquery";` для подключения стилевых файлов библиотек импортируйте их в файл `src/styles/_libs.scss` (который в свою очередь импортируется в файл
    `src/styles/main.scss`)
- в вёрстку подключаются только минифицированные CSS и JS-файлы.

## БЭМ

В сборке используется компонентный подход к разработке сайтов по методолгии БЭМ, когда каждый БЭМ-блок имеет свою папку, внутри которой находятся один Htm-файл, один SCSS-файл и
один JS-файл (если у блока используется скрипт). Чтобы вручную не создавать соответствующие папку и файлы, достаточно в консоли прописать следующие команды:

- `bem create my-block` - для создания папки БЭМ-блока, где `my-block` - имя БЭМ-блока
- `bem create my-component -l src/blocks/components` для создания компонента
- `bem create my-component -l src/blocks/components && bem create my-block` - создать всё вместе

## WebP 

В сборщик включена поддержка WebP. WebP — это формат графики, разработанный Google в 2010 году. Он был создан как альтернатива PNG и JPG и отличается от них гораздо меньшим размером при том же качестве изображения. Подробная информация по использованию [тут](https://vk.com/@vk_it-webp).

## Контакты

- ВКонтакте: [@ndeviant](https://vk.com/ndeviant)
- Telegram: [@ndeviant](https://t-do.ru/ndeviant)
