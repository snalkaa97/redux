/**
 * App.js buat dipanggil di index.js.
 * Supaya redux bisa dijalanin maka harus ada tag "<Provider store={store}>". Cuma line ini aja yang wajib harus ada.
 * Tag-tag lain kayak StrictMode, BrowserRouter, Routes, sebenarnya gak ngaruh sama redux, gak ada hubungannya sama redux, dan murni cuma pelengkap aja.
 * Kalau mau tau lebih detail fungsi masing-masing tag kayak StrictMode dll bisa coba-coba explore di dokumentasi nya juga, buat info aja.
 *
 * Singkatnya:
 *
 * - StrictMode: tag buat testing render komponen React dengan cara codenya dieksekusi 2 kali buat liat apakah ada bug atau ga.
 * Biasanya kalau codenya di eksekusi 1 kali keliatan seolah2 gak ada bug, tapi pas dieksekusi 2 kali, baru ketauan ada bug/error.
 * Bugnya bisa jadi contoh tampilannya jadi berantakan, CRUD state reduxnya jadi kacau, dll, itu yang umum aja sih.
 * Jadi StrictMode ini cukup penting juga dipakai buat testing selama dev.
 * StrictMode ini cuma buat dev aja, dia otomatis bakal ke disable sendiri di production.
 * https://reactjs.org/docs/strict-mode.html
 *
 * - Provider: komponen buat nyediain store Redux biar bisa diakses sama semua komponen child.
 * Biasanya komponennya ini ditaruh di urutan paling atas.
 * Provider ini wajib buat akses state di store Redux, kalau gak ada, otomatis kita gak bisa ambil state Redux.
 * https://react-redux.js.org/api/provider
 *
 * - BrowserRouter: komponen buat navigasi url di browser. Bawaannya modul react-router-dom.
 * https://reactrouter.com/en/main/router-components/browser-router
 *
 * - Routes: Rute kustom buat nentuin dan ngarahin url ke halaman tertentu sesuai kebutuhan.
 * Penjelasan lebih detail di routes/index.js.
 * https://reactrouter.com/en/main/components/routes
*/

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Routes from './routes';
import {StrictMode} from 'react';
import store from './redux/store';

const App = () =>
(
  <StrictMode>
      <Provider store={store}> {/* LINE WAJIB BUAT REDUX */}
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
  </StrictMode>
);

export default App;
