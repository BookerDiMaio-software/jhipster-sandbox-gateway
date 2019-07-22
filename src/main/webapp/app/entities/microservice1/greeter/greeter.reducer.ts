import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, ICrudGetByNameAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IGreeter, defaultValue } from 'app/shared/model/microservice1/greeter.model';

export const ACTION_TYPES = {
  FETCH_GREETER_LIST: 'greeter/FETCH_GREETER_LIST',
  FETCH_GREETER: 'greeter/FETCH_GREETER',
  SEARCH_GREETER: 'greeter/SEARCH_GREETER',
  CREATE_GREETER: 'greeter/CREATE_GREETER',
  UPDATE_GREETER: 'greeter/UPDATE_GREETER',
  DELETE_GREETER: 'greeter/DELETE_GREETER',
  RESET: 'greeter/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGreeter>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type GreeterState = Readonly<typeof initialState>;

// Reducer

export default (state: GreeterState = initialState, action): GreeterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GREETER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GREETER):
    case REQUEST(ACTION_TYPES.SEARCH_GREETER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GREETER):
    case REQUEST(ACTION_TYPES.UPDATE_GREETER):
    case REQUEST(ACTION_TYPES.DELETE_GREETER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GREETER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GREETER):
    case FAILURE(ACTION_TYPES.SEARCH_GREETER):
    case FAILURE(ACTION_TYPES.CREATE_GREETER):
    case FAILURE(ACTION_TYPES.UPDATE_GREETER):
    case FAILURE(ACTION_TYPES.DELETE_GREETER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GREETER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_GREETER):
    case SUCCESS(ACTION_TYPES.SEARCH_GREETER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GREETER):
    case SUCCESS(ACTION_TYPES.UPDATE_GREETER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GREETER):
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

const apiUrl = 'services/microservice1/api/greeters';
const apiSearchUrl = 'services/microservice1/api/greeters/find';

// Actions

export const getEntities: ICrudGetAllAction<IGreeter> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GREETER_LIST,
  payload: axios.get<IGreeter>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IGreeter> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GREETER,
    payload: axios.get<IGreeter>(requestUrl)
  };
};

export const getEntityByName: ICrudGetByNameAction<IGreeter> = (firstName, lastName) => {
  const requestUrl = `${apiSearchUrl}?firstName=${firstName}&lastName=${lastName}`;
  return {
    type: ACTION_TYPES.SEARCH_GREETER,
    payload: axios.get<IGreeter>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGreeter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GREETER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGreeter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GREETER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGreeter> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GREETER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
