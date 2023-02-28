import React from 'react';
import { createRoot } from 'react-dom/client';
import {App} from './components/App.js'
 
const title = 'Timecards - Jobs';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App title={title} />);
