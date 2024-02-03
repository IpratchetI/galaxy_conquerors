- [Базовые классы](#базовые-классы)
  - [GameEngine](#gameengine)
  - [AbstractGameObject](#abstractgameobject)
  - [Расчет столкновений](#расчет-столкновений)
  - [Sound](#sound)
  - [Sprite](#sprite)
  - [Vector](#vector)
- [Классы игровых объектов](#классы-игровых-объектов)
  - [Player](#player)
  - [Swarm](#swarm)
  - [Enemy](#enemy)
  - [Projectile](#projectile)

# GameEngine

Основной класс, отвечающий за запуск игрового цикла, инициализацию игровых объектов и содержащий вспомогательные методы для работы с логикой игры.

## Аргументы конструктора типа TGameEngineOptions

| Имя      | Описание                                                          |
|----------|-------------------------------------------------------------------|
| ctx      | 2D контекст, на котором будет рисоваться игра                    |
| debug    | Флаг включения отладочной информации (по умолчанию: false)        |
| width    | Ширина игрового поля                                              |
| height   | Высота игрового поля                                              |
| onScoreUpdate | Callback, вызываемый при получении игроком очков             |
| onGameOver   | Callback, вызываемый при завершении игры                      |

## Пример инициализации и запуска игрового движка

```typescript
const gameEngine = new GameEngine({
  /* Опции */
});

gameEngine.registerObject([
  /* Классы игровых объектов: Player и Swarm */
]);

const initResult = await gameEngine.init();
if (!initResult) throw new Error('Ошибка инициализации');

gameEngine.start();

