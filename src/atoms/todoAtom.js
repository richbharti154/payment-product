import { atom } from 'recoil';
import { nanoid } from 'nanoid';

export const todosState = atom({
  key: 'todosState', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      id: nanoid(),
      text: 'Practice React',
      completed: false,
      shown: true,
      date: '2022-11-10',
      time: '01: 40',
      editing: false,
    },
    {
      id: nanoid(),
      text: 'Practice JS',
      completed: true,
      shown: true,
      date: '2022-10-11',
      time: '10: 20',
      editing: true,
    },
  ], // default value (aka initial value)
});

// this tracks the no. of times add todo is clicked
export const countTodosState = atom({
  key: 'countTodosState',
  default: 0,
});
// text: [{ts: 23232, text: 'Lern Rect' }, [{ts: 23242, text: 'Learn JS'}]]
// text: ['asdfdf', 'sadsd']
