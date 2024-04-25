import { AssociateModel } from '../model/associate.model';
// step one
export const AssociateState: AssociateModel = {
  list: [],
  errorMessage: '',
  associateObj: {
    id: 0,
    name: '',
    email: '',
    phone: '',
    type: 'CUSTOMER',
    address: '',
    associategroup: 'level1',
    status: true,
  },
};
