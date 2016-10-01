import { fromJS, List } from 'immutable';

const initialState = fromJS({
  loading: false,
  list: [],
  selectedVehicle: null,
});

function vehicles(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_VEHICLES':
      return state.set('loading', action.loading);

    case 'STORE_VEHICLES':
      // existing API returns duplicates . . .
      return state.set('list', fromJS(action.json).filter((element, index, list) => {
        return (list.count(vehicle => {
          return vehicle.get('vehicleId') == element.get('vehicleId')
        }) == 1);
      }));

    case 'SELECT_VEHICLE':
      if (state.get('list').size == 0) return state;

      if (action.vehicleId) {
        return state.set('selectedVehicle', state.get('list').find(vehicle => {
          return vehicle.get('vehicleId') == action.vehicleId;
        }));
      }
      else {
        return state.set('selectedVehicle', state.getIn(['list', 0]));
      }

    default:
      return state;
  }
}

export default vehicles;
