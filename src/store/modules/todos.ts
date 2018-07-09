import { Record, List } from "immutable";
import { createAction, handleActions, Action } from "redux-actions";

const CREATE = "todos/CREATE";
const REMOVE = "todos/REMOVE";
const TOGGLE = "todos/TOGGLE";
const CHANGE_INPUT = "todos/CHANGE_INPUT";

type CreatePayload = string;
type RemovePayload = number;
type TogglePayload = number;
type ChangeInputPayload = string;

export const actionCreators = {
  create: createAction<CreatePayload>(CREATE),
  remove: createAction<RemovePayload>(REMOVE),
  toggle: createAction<TogglePayload>(TOGGLE),
  changeInput: createAction<ChangeInputPayload>(CHANGE_INPUT)
};

const TodoItemRecord = Record({
  id: 0,
  text: "",
  done: false
});

interface TodoItemDataParams {
  id?: number;
  text?: string;
  done?: boolean;
}

// 나중에 TodoItem 컴포넌트의 스테이트 타입 검사를 위해 export한다.
export class TodoItemData extends TodoItemRecord {
  static autoId: number = 0;
  id: number;
  text: string;
  done: boolean;
  constructor(params?: TodoItemDataParams) {
    const id = TodoItemData.autoId;
    if (params) {
      super({
        ...params,
        id
      });
    } else {
      super({ id });
    }
    TodoItemData.autoId = id + 1;
  }
}

// 이건 TodoList컴포넌트의 상태
const TodosStateRecord = Record({
  todoItems: List(),
  input: ""
});
// 나중에 TodoList에서 state에 대해 타입 검사를 하기 위해 export한다
export class TodosState extends TodosStateRecord {
  todoItems: List<TodoItemData>;
  input: string;
}

const initialState = new TodosState();

export default handleActions<TodosState, any>(
  {
    [CREATE]: (state, action: Action<CreatePayload>): TodosState => {
      // withMutations는 immutable.js에서 제공하는 것.
      return state.withMutations(s => {
        s.set("input", "").update(
          "todoItems",
          (todoItems: List<TodoItemData>) =>
            todoItems.push(new TodoItemData({ text: action.payload }))
        );
      }) as TodosState;
    },
    [REMOVE]: (state, action: Action<RemovePayload>): TodosState => {
      return state.update("todoItems", (todoItems: List<TodoItemData>) =>
        todoItems.filter(t => (t ? t.id !== action.payload : false))
      ) as TodosState;
    },
    [TOGGLE]: (state, action: Action<TogglePayload>): TodosState => {
      const index = state.todoItems.findIndex(
        t => (t ? t.id === action.payload : false)
      );
      return state.updateIn(
        ["todoItems", index, "done"],
        done => !done
      ) as TodosState;
    },
    [CHANGE_INPUT]: (state, action: Action<ChangeInputPayload>): TodosState => {
      return state.set("input", action.payload) as TodosState;
    }
  },
  initialState
);
