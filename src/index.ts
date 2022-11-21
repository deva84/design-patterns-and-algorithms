import './style.less';
import { Client } from './client/client';

const client = Client.getInstance();
client.listenToEvents();

console.log('Hello World!');
