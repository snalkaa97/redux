/**
 * URL pas di hit nanti ngarahnya ke mana aja, kita tentuin semuanya di sini pakai modul yang namanya react-router-dom.
 * https://reactrouter.com/en/main
 */

import {Navigate, Routes as ReactRoutes, Route} from 'react-router-dom';
import Home from './../pages/home';

const Routes = () =>
(
  <ReactRoutes>

    {/* Route di bawah artinya kalau kita buka http://localhost:3000, maka yang ditampilkan/dirender adalah komponen/halaman Home. */}
    <Route path='/' element={<Home />} />

    {/* Route di bawah artinya kalau kita buka url selain yang udah ada, misal url asal2an, http://localhost:3000/test123, maka dia bakal navigasi ke http://localhost:3000, otomatis balik lagi ke halaman Home. */}
    {/* Selain cara ini, bisa juga tampilin halaman 404 Not Found kalau halamannya gak ketemu. */}
    <Route path='*' element={<Navigate to='/' />} />

  </ReactRoutes>
);

export default Routes;
