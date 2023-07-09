import { v4 as uuidv4 } from 'uuid';

export const baseStatusIdDict = {
  pending:  uuidv4(),
  success:  uuidv4(),
  notSelected:  uuidv4(),
}

export const regExpDate = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/g;