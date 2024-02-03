# Игровой движок <!-- omit in toc -->

- [Страница игры](#страница-игры)
    -[Основные функциональности](#основные-функциональности)
    -[Внутренние переменные](#внутренние-переменные)
    -[Основные методы](#основные-методы)
- [GameEngine](#gameengine)
- [Классы игровых объектов](#классы-игровых-объектов)
  - [Ship](#ship)
  - [Bullet](#bullet)
  - [Enemy](#enemy)
  - [Explosion](#explosion)
- [Вспомогательные классы](#вспомогательные-классы)
  - [Constants](#constants)
  - [InputHandler](#inputhandler)
  - [GameManager](#gamemanager)
  - [BreakGamePopup](#breakgamepopup)

## Страница игры

Компонент Game представляет собой страницу игры, где пользователь может играть. Этот компонент содержит холст для отрисовки игры, кнопку для переключения в полноэкранный режим и всплывающее окно для паузы в игре.

### Основные функциональности:

1. Отрисовка игрового процесса на холсте.
2. Обработка переключения в полноэкранный режим.
3. Всплывающее окно для паузы в игре.
4. Обновление максимального счета игрока и последнего счета после окончания игры.

### Внутренние переменные:
|           Имя            |                                    Описвние                                                                    |
| :----------------------: | :------------------------------------------------------------------------------------------------------------- |
|   **redirectTime**       |  Время задержки перед перенаправлением на страницу Game Over после окончания игры.                             |
|   **BreakGame**          |  Тип, представляющий объект, который обрабатывает паузу в игре и возвращает количество уничтоженных врагов.    |
|   **breakRef**           |  Ссылка на объект BreakGame.                                                                                   |
|   **canvasRef**          |  Ссылка на холст.                                                                                              |
|   **endGameRef**         |  Ссылка на функцию завершения игры.                                                                            |
|   **canvasPropsRef**     |  Ссылка на объект с параметрами холста и функцией завершения игры.                                             |

### Основные методы:

1. **setScore**: Обновляет максимальный счет игрока.
2. **endGame**: Завершает игру и перенаправляет на страницу Game Over.
handleOpenBreakPopup: Обрабатывает открытие и закрытие всплывающего окна для паузы в игре.
toggleFullscreen: Переключает полноэкранный режим.
useEffect: Используется для инициализации игрового движка при первом рендере компонента и для добавления и удаления обработчиков событий при изменении размера окна или нажатии на клавишу Esc.
return: Возвращает разметку игрового компонента с холстом, всплывающим окном для паузы и кнопкой для переключения в полноэкранный режим.
Примечания:
При монтировании компонента инициализируется игровой движок, обрабатываются события изменения размера окна и нажатия на клавишу Esc.
При размонтировании компонента удаляются обработчики событий и останавливается обновление игрового движка.
Изменение размеров холста происходит при изменении размера окна браузера.
Обработка паузы в игре происходит при нажатии на клавишу Esc или через всплывающее окно.

## Базовые классы

## GameEngine

Основной класс, отвечающий за запуск игрового цикла, инициализацию игровых объектов и содержащий вспомогательные методы для работы с различной логикой игры.

### Аргументы конструктора

|        Имя               | Описание                                                |
| :----------------------: | :------------------------------------------------------ |
|      **canvasProps**     | Объект, содержащий ссылку на элемент canvas и функцию завершения игры |

##### Параметры объекта `canvasProps`

|        Имя                | Описание                                   |
| :------------------------:| :----------------------------------------- |
|      **canvasRef**        | Ссылка на элемент canvas                   |
|      **endGameRef**       | Ссылка на функцию завершения игры          |

#### Пример инициализации и запуска игрового движка

```javascript
import GameEngine from './GameEngine/GameEngine';

// Создание экземпляра игрового движка с передачей необходимых параметров
const gameEngine = new GameEngine({
  /* Параметры */
});

// Начало игрового цикла
gameEngine.start();

```

### Инициализация и запуск игрового движка

1. Создается экземпляр игрового движка с указанными параметрами, передаваемыми в конструктор.
2. Затем вызывается метод start() для запуска игрового цикла.

#### Методы

- **start()**: Запускает игровой цикл.
- **getDestroyedEnemiesCount()**: Возвращает количество уничтоженных врагов.
- **stop()**: Останавливает игровой цикл.
- **stopUpdate()**: Останавливает обновление игры.
- **break()**: Переключает состояние паузы игры.

#### Приватные методы

- **updateGame()**: Обновляет состояние игры.
- **drawGame()**: Отрисовывает игровые объекты.
- **handleKeyDown(event: KeyboardEvent)**: Обрабатывает нажатия клавиш.
- **handleKeyUp(event: KeyboardEvent)**: Обрабатывает отпускание клавиш.
- **createEnemies()**: Создает врагов.
- **moveEnemies()**: Двигает врагов по игровому полю.
- **moveShip()**: Двигает игрока.
- **updateBullets()**: Обновляет состояние пуль.
- **drawShip()**: Отрисовывает игрока.
- **drawBullets()**: Отрисовывает пули.
- **drawEnemies()**: Отрисовывает врагов.
- **clearCanvas()**: Очищает игровое поле.
- **shoot()**: Выстреливает пулей.
- **gameLoop()**: Основной игровой цикл.
- **checkShipBounds()**: Проверяет границы игрового поля для игрока.
- **checkStopEnemies()**: Проверяет, достигли ли враги нижней границы игрового поля.
- **checkBulletEnemyCollisions()**: Проверяет столкновения пуль и врагов.

## Классы игровых объектов

### Ship

Класс, описывающий логику работы с объектом корабля игрока.

#### Аргументы конструктора

|    Имя    |       Описание       |
| :--------:| :------------------- |
|   **x**   |   Координата X.      |
|   **y**	|   Координата Y.      |

#### Методы

|                            Метод	                                |                   Описание                           |
| :----------------------------------------------------------------:| :--------------------------------------------------- |
|   **moveLeft()**	                                                |   Сдвигает корабль игрока влево по игровому полю.    |
|   **moveRight()**	                                                |   Сдвигает корабль игрока вправо по игровому полю.   |
|   **stopMoving()**	                                            |   Останавливает движение корабля игрока.             |
|   **startAnimation()**                                            |	Запускает анимацию движения корабля.               |
|   **stopAnimation()**	                                            |   Останавливает анимацию движения корабля.           |
|   **update(canvasWidth: number)**	                                |   Обновляет состояние корабля.                       |
|   **draw(ctx: CanvasRenderingContext2D, canvasHeight: number)**	|   Отрисовывает корабль на игровом поле.              |

####    Пример использования класса Ship


```javascript
import Ship from './Ship';

// Создание экземпляра корабля игрока
const playerShip = new Ship({ x: 100, y: 200 });

// Перемещение корабля влево
playerShip.moveLeft();

// Остановка движения корабля
playerShip.stopMoving();
```

####    Примечания
1. Класс Ship отвечает за управление кораблем игрока на игровом поле.
2. Методы moveLeft() и moveRight() изменяют координату X корабля для движения влево и вправо соответственно.
3. Метод stopMoving() останавливает движение корабля.
4. Методы startAnimation() и stopAnimation() запускают и останавливают анимацию движения корабля соответственно.
5. Метод update(canvasWidth: number) обновляет состояние корабля, учитывая ширину игрового поля.
6. Метод draw(ctx: CanvasRenderingContext2D, canvasHeight: number) отрисовывает корабль на игровом поле, используя контекст рисования и высоту игрового поля.

### Enemy

Класс, описывающий логику работы с объектом врага.

#### Аргументы конструктора

|      Имя      |       Описание       |
| :------------:| :------------------- |
|   **x**       |   Координата X.      |
|   **y**	    |   Координата Y.      |
|   **speed**   |	Скорость врага.    |

####    Методы

|               Метод	                    |               Описание                |
| :----------------------------------------:| :------------------------------------ |
|   **draw(ctx: CanvasRenderingContext2D)** |	Отрисовывает врага на игровом поле. |

#### Пример использования класса Enemy

```javascript
Copy code
import Enemy from './Enemy';

// Создание экземпляра врага
const enemy = new Enemy({ x: 100, y: 200, speed: 5 });

// Отрисовка врага на игровом поле
enemy.draw(ctx);
```

#### Примечания

1. Класс Enemy отвечает за управление врагом на игровом поле.
2. Враги могут двигаться вправо и влево по игровому полю.
3. При достижении края игрового поля враги смещаются вниз и меняют направление движения.
4. Метод draw(ctx: CanvasRenderingContext2D) отрисовывает врага на игровом поле с учетом его текущего положения и скорости.

### Bullet

Класс, описывающий логику работы с объектом пули.

#### Аргументы конструктора

|      Имя      |       Описание       |
| :------------:| :------------------- |
|   **x**       |   Координата X.      |
|   **y**	    |   Координата Y.      |
|   **width**	|   Ширина пули.       |
|   **height**	|   Высота пули.       |
|   **speed**	|   Скорость пули.     |

#### Методы

|                    Метод	                |                       Описание                               |
| :----------------------------------------:| :----------------------------------------------------------- |
|   **update()**                            |	Обновляет координаты пули в соответствии со скоростью.     |
|   **draw(ctx: CanvasRenderingContext2D)**	|   Отрисовывает пулю на игровом поле.                         |
|   **isOutOfBounds()**	                    |   Проверяет, находится ли пуля за границами игрового поля.   |

####    Пример использования класса Bullet:

```javascript
Copy code
import Bullet from './Bullet';

// Создание экземпляра пули
const bullet = new Bullet({ x: 100, y: 200, width: 10, height: 20, speed: 5 });

// Обновление координат пули
bullet.update();

// Отрисовка пули на игровом поле
bullet.draw(ctx);

// Проверка, находится ли пуля за границами игрового поля
const isOutOfBounds = bullet.isOutOfBounds();
```

####    Примечания

1. Класс Bullet отвечает за управление пулями на игровом поле.
2. Пули двигаются вверх с постоянной скоростью.
3. Метод update() обновляет координаты пули на основе ее скорости.
4. Метод draw(ctx: CanvasRenderingContext2D) отрисовывает пулю на игровом поле.
5. Метод isOutOfBounds() проверяет, находится ли пуля за границами игрового поля.

### Explosion

Класс, отвечающий за отображение анимации взрыва.

####    Аргументы конструктора

|    Имя	|           Описание            |
|   **x**	|   Координата X центра взрыва. |
|   **y**	|   Координата Y центра взрыва. |

#### Методы

|                Метод	                    |            Описание                            |
|   **startAnimation()**                	|   Начинает проигрывание анимации взрыва.       |
|   **stopAnimation()**	                    |   Останавливает проигрывание анимации взрыва.  |
|   **draw(ctx: CanvasRenderingContext2D)** |	Отрисовывает взрыв на игровом поле.          |

####    Пример использования класса Explosion

```javascript
Copy code
import Explosion from './Explosion';

// Создание экземпляра взрыва
const explosion = new Explosion({ x: 100, y: 200 });

// Начало анимации взрыва
explosion.startAnimation();

// Отрисовка взрыва на игровом поле
explosion.draw(ctx);
```

####    Примечания

1. Класс Explosion предоставляет возможность отображения анимации взрыва на игровом поле.
2. При создании экземпляра взрыва начинается проигрывание анимации автоматически.
3. Метод startAnimation() запускает проигрывание анимации взрыва.
4. Метод stopAnimation() останавливает проигрывание анимации взрыва.
5. Метод draw(ctx: CanvasRenderingContext2D) отрисовывает взрыв на игровом поле.

### Константы
Файл constants.ts содержит набор констант, используемых в игровом процессе.

#### Список констант:
1. **enemyBorder**: Граница, за которую враги не могут пересекать игровое поле. (Значение по умолчанию: 100)
2. **initialShipOffsetX**: Начальное смещение по оси X для корабля игрока при инициализации игры. (Значение по умолчанию: 25)
3. **initialShipOffsetY**: Начальное смещение по оси Y для корабля игрока при инициализации игры. (Значение по умолчанию: 50)
4. **animationFrameDuration**: Длительность одного кадра анимации в миллисекундах. (Значение по умолчанию: 50)
5. **shipVerticalOffset**: Вертикальное смещение корабля игрока от нижнего края игрового поля. (Значение по умолчанию: 50)
6. **shipSpeed**: Скорость перемещения корабля игрока. (Значение по умолчанию: 10)
7. **shipSize**: Размер корабля игрока (ширина и высота). (Значение по умолчанию: 100)
8. **enemyWidth**: Ширина вражеского корабля. (Значение по умолчанию: 70)
9. **enemyHeight**: Высота вражеского корабля. (Значение по умолчанию: 70)
10. **bulletWidth**: Ширина пули. (Значение по умолчанию: 20)
11. **bulletHeight**: Высота пули. (Значение по умолчанию: 70)
12. **bulletSpeed**: Скорость движения пули. (Значение по умолчанию: 10)

#### Примечания:

Файл constants.ts содержит значения констант, используемых для определения различных параметров игры.
Изменение этих констант может повлиять на поведение игровых объектов и общее игровое впечатление.

#### Модуль GameEngine
GameEngine представляет собой игровой движок, ответственный за управление игровым процессом, обработку взаимодействий объектов и отрисовку игровых элементов на холсте.

Основные методы и свойства:
constructor(canvasProps: CanvasProps): Конструктор класса, принимает объект CanvasProps, содержащий ссылку на холст и функцию завершения игры.

start(): Метод запускает игровой цикл.

getDestroyedEnemiesCount(): number: Метод возвращает количество уничтоженных врагов.

stop(): Метод останавливает обновление игрового процесса.

stopUpdate(): Метод полностью останавливает работу игрового движка.

break(): Метод обрабатывает паузу в игре.

protected updateGame(): Метод обновляет состояние игры (позиции объектов, коллизии и т. д.).

protected drawGame(): Метод отрисовывает текущее состояние игры на холсте.

protected handleKeyDown(event: KeyboardEvent): Обработчик нажатия клавиш на клавиатуре.

protected handleKeyUp(event: KeyboardEvent): Обработчик отпускания клавиш на клавиатуре.

protected createEnemies(): Метод создает вражеские объекты.

protected moveEnemies(): Метод перемещает вражеские объекты.

private moveShip(): Метод перемещает игрока.

private updateBullets(): Метод обновляет состояние пуль.

private drawShip(): Метод отрисовывает игрока.

private drawBullets(): Метод отрисовывает пули.

private drawEnemies(): Метод отрисовывает врагов.

private clearCanvas(): Метод очищает холст.

private shoot(): Метод производит выстрел.

private gameLoop(): Метод игрового цикла.

private checkShipBounds(): Метод проверяет границы игрока на холсте.

protected checkStopEnemies(): Метод проверяет достижение врагами нижней границы холста.

protected checkBulletEnemyCollisions(): Метод проверяет коллизии пуль с врагами.

Примечания:
GameEngine использует объекты Ship, Bullet, Enemy и Explosion для реализации игрового процесса.
Отрисовка и обновление игры происходит с использованием методов updateGame() и drawGame().
Обработка пользовательского ввода осуществляется через методы handleKeyDown() и handleKeyUp().
При достижении нижней границы холста игра завершается, количество уничтоженных врагов выводится в консоль, и вызывается функция завершения игры.
GameEngine предоставляет возможность остановки и паузы в игре.

#### diagram

classDiagram
  direction LR

  class AbstractGameObject {
    <<abstract>>
    +x: number
    +y: number
    +width: number
    +height: number
    +speed: number
    +frames: string[]
    +currentAnimationFrame: number
    +animationTimer: NodeJS.Timeout | null

    +moveLeft() void
    +moveRight() void
    +stopMoving() void
    +startAnimation() void
    +stopAnimation() void
    +update(canvasWidth: number) void
    +draw(ctx: CanvasRenderingContext2D, canvasHeight: number) void
    +nextFrame() void
  }

  class Ship {
    -moveShipDirection: number
    -shipImage: HTMLImageElement

    +moveLeft() void
    +moveRight() void
    +stopMoving() void
    +startAnimation() void
    +stopAnimation() void
    +update(canvasWidth: number) void
    +draw(ctx: CanvasRenderingContext2D, canvasHeight: number) void
    +nextFrame() void
  }

  class Bullet {
    -bulletImage: HTMLImageElement

    +update() void
    +draw(ctx: CanvasRenderingContext2D) void
    +isOutOfBounds() boolean
  }

  class Enemy {
    -enemyImages: HTMLImageElement[]
    -currentAnimationFrame: number
    -isAnimationStopped: boolean

    +draw(ctx: CanvasRenderingContext2D) void
  }

  class Explosion {
    -frames: string[]
    -currentAnimationFrame: number
    -explosionImage: HTMLImageElement
    -animationTimer: NodeJS.Timeout | null
    -played: boolean

    +draw(ctx: CanvasRenderingContext2D) void
    +startAnimation() void
    +stopAnimation() void
    +nextFrame() void
  }

  class Game {
    -isModalOpen: boolean
    -breakRef: React.MutableRefObject<BreakGame>
    -canvasRef: React.MutableRefObject<HTMLCanvasElement | null>

    +setScore(scoreNow: number) void
    +endGame() void
    +handleOpenBreakPopup() void
    +toggleFullscreen() void
  }

  class GameEngine {
    -canvas: HTMLCanvasElement
    -closeCanvas: () => void
    -stopEngine: boolean
    -isBreak: boolean
    -breakStartTime: number
    -breakEndTime: number
    -ctx: CanvasRenderingContext2D
    -ship: Ship | null
    -bullets: Bullet[]
    -enemies: Enemy[]
    -lastShotTime: number
    -destroyedEnemiesCount: number
    -isCountReported: boolean
    -initialEnemySpeed: number
    -shootInterval: number
    -stopEnemyBorder: number
    -shipExplosion: Explosion | null
    -enemyExplosion: Explosion | null

    +start() void
    +getDestroyedEnemiesCount(): number
    +stop() void
    +stopUpdate() void
    +break() void
  }

  GameEngine o-- "0..1" Ship
  GameEngine o-- "0..*" Bullet
  GameEngine o-- "0..*" Enemy
  GameEngine o-- "0..1" Explosion
  GameEngine o-- Game
  Game o-- "0..*" Bullet
  Game o-- "0..*" Enemy
  Game o-- "0..1" Ship
  Bullet --|> AbstractGameObject
  Ship --|> AbstractGameObject
  Enemy --|> AbstractGameObject
  Explosion --|> AbstractGameObject
