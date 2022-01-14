import faker from 'faker';// librairie faker pour generer de la fake data pour notre demo
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  company: faker.random.number({
    'min': 0,
    'max': 10
}),
  isVerified: sample(['INE1', 'INE2','INE3']),
  status: sample(['Avertissement', 'Blame','Exclusion']),
  role: sample([
    'CLOUD',
    'ASEDS',
    'SESNUM',
    'AMOA',
    'SMART',
    'DATA',
    'ICCN',
    
  ])
}));

export default users;
