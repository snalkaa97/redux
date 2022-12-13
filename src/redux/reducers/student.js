/**
 * Template standar Reducer buat Redux Toolkit.
 */

import {createSlice} from '@reduxjs/toolkit';

/**
 * Nama Reducer.
 */
const name = 'student';

/**
 * State awal. Biasanya kosong, false, 0, dll, tapi balik lagi sesuai kebutuhan.
 */
const initialState =
{
  students: []
};

/**
 * Daftar fungsi reducers buat CRUD initial state.
 * Bebas mau bikin fungsi apa aja sesuai kebutuhan.
 * Cuma yang perlu diperhatikan saat CRUD, usahakan lakukan proses CRUD secara "immutable", artinya kita gak boleh sembarang ubah state secara langsung, tapi kita harus bikin copyan/duplikatnya dulu baru kita bisa ubah dari situ. https://css-tricks.com/understanding-immutability-in-javascript
 * Panduan yang biasa aku pakai: https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript#immutable-array-operations
 */
const reducers =
{
  addStudent: (state, action) =>
  {
    state.students = [...state.students, action.payload];
  },
  updateStudent: (state, action) =>
  {
    state.students = state.students.map((student) =>
    {
      if (student.id === action.payload.id)
      {
        const updatedStudent =
        {
          ...student,
          name: action.payload.name,
          age: action.payload.age,
          phone: action.payload.phone,
          address: action.payload.address
        };

        return updatedStudent;
      }

      return student;
    })
  },
  deleteStudent: (state, action) =>
  {
    const studentIndex = state.students.map((student) => student.id).indexOf(action.payload.id);

    state.students = [...state.students.slice(0, studentIndex), ...state.students.slice(studentIndex + 1)];
  },
  fetchDataPokemon: (state, action) => {
    console.log(action.payload);
  }
};

/**
 * Buat slice, ini template juga.
 */
const slice = createSlice(
{
  name: name,
  initialState: initialState,
  reducers: reducers
});

/**
 * Terus kita export semua fungsi reducers yang udah kita buat tadi.
 */
export const {addStudent, updateStudent, deleteStudent, fetchDataPokemon} = slice.actions;

export default slice.reducer;
