import { fromCustomers } from './lib/+state/customers.selectors';

export const selectSelectedCustomer = fromCustomers.selectSelectedCustomer;
export { customersRoutes } from './lib/customers.routes';
