/**
 * index.js standar seperti biasa buat manggil komponen App buat dirender di element root.
*/

import App from './app';
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
