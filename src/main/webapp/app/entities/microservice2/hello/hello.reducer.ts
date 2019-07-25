import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IHello, defaultValue } from 'app/shared/model/microservice2/hello.model';

export const ACTION_TYPES = {
  FETCH_HELLO_LIST: 'hello/FETCH_HELLO_LIST',
  FETCH_HELLO: 'hello/FETCH_HELLO',
  CREATE_HELLO: 'hello/CREATE_HELLO',
  UPDATE_HELLO: 'hello/UPDATE_HELLO',
  DELETE_HELLO: 'hello/DELETE_HELLO',
  RESET: 'hello/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHello>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type HelloState = Readonly<typeof initialState>;

// Reducer

export default (state: HelloState = initialState, action): HelloState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HELLO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HELLO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HELLO):
    case REQUEST(ACTION_TYPES.UPDATE_HELLO):
    case REQUEST(ACTION_TYPES.DELETE_HELLO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HELLO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HELLO):
    case FAILURE(ACTION_TYPES.CREATE_HELLO):
    case FAILURE(ACTION_TYPES.UPDATE_HELLO):
    case FAILURE(ACTION_TYPES.DELETE_HELLO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HELLO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HELLO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HELLO):
    case SUCCESS(ACTION_TYPES.UPDATE_HELLO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HELLO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'services/microservice2/api/hellos';

// Actions

export const getEntities: ICrudGetAllAction<IHello> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HELLO_LIST,
  payload: axios.get<IHello>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IHello> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HELLO,
    payload: axios.get<IHello>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHello> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HELLO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHello> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HELLO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHello> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HELLO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
