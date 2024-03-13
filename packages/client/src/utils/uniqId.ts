import { customAlphabet } from 'nanoid';

const uniqIdGenerator = customAlphabet('1234567890', 5);

/**
 * Функция получения уникального числового идентификатора длиной 5 знаков
 * @returns Уникальный идентификатор
 */
export const uniqId = () => parseInt(uniqIdGenerator(), 10);
