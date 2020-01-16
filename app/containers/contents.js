import Recording from './Content/Recording';
import Settings from './Content/Settings';

const contents = [
  {
    path: '/recording',
    title: 'Recording',
    icon: 'camera',
    component: Recording,
    subItems: []
  },
  {
    path: '/setting',
    title: 'Setting',
    icon: 'setting',
    component: Settings,
    subItems: []
  }
];

export default contents;
