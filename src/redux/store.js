/**
 * Store ini buat nyimpan state Redux dan bakal dipanggil di app.js buat di provide ke semua komponen child biar bisa diakses.
 * Sebagian besar udah template, tinggal import aja reducer yang udah kita buat terus tambahin di configureStore.
 * Di contoh ini kita cuma ada satu reducer aja yaitu Student. Kalau reducer yang kita buat lebih dari satu, maka perlu kita gabung pakai fungsi combineReducers.
 */

import {configureStore} from '@reduxjs/toolkit';
import studentReducer from './reducers/student'; /** Import reducer yang udah kita buat. */

/**
 * Deklarasi middleware, udah template. Sesuai namanya middleware bakal jalan saat kondisi tertentu yang udah kita tentuin contoh ada perubahan state ataupun kondisi actionnya.
 * Tapi ada case di mana kita bisa nambahin middleware custom juga misal buat logger dll. Untuk nambah middleware custom, kita bisa tinggal concat aja di getDefaultMiddleware.
 * https://redux-toolkit.js.org/api/getDefaultMiddleware
 */
const middleware = (getDefaultMiddleware) => getDefaultMiddleware(
{
  serializableCheck:
  {
    ignoreActions: true
  }
});

const store = configureStore(
{
  reducer: studentReducer, /** Reducer yang kita buat. Kalau lebih dari satu perlu digabungin dulu pakai combineReducers. */
  middleware: middleware, /** Middlewarenya. */
  devTools: process.env.NODE_ENV !== 'production' /** devTools tujuannya biar kita bisa liat/debug state Redux di browser pakai extension namanya Redux DevTools. Kita kasih kondisi buat cek environment NODE_ENV, kalau production berarti di disable, selebihnya enable. Redux DevTools buat Chrome bisa diinstall di sini: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en */
});

export default store;
