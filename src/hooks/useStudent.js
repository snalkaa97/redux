/**
 * Di sini kita buat satu hook custom contoh namanya useStudent, sebenarnya bebas sih namanya boleh apa aja cuma alangkah lebih baik ikut konvensi penamaan aja biasanya kalau hook diawali dengan "use...".
 * Tujuannya buat membungkus semua state dan fungsi yang ada di store Redux biar gampang diakses dari satu tempat ini.
 * Sintaknya jadi lebih ringkas, gak perlu panggil dispatch terus2an, dan bisa di share di mana2 juga.
 */

import {useDispatch, useSelector} from 'react-redux';
import {addStudent as addNewStudent, updateStudent as updateOldStudent, deleteStudent as deleteOldStudent, fetchDataPokemon} from './../redux/reducers/student';


const useStudent = () =>
{
  const dispatch = useDispatch(); /** dispatch dipakai buat ngedispatch action. https://react-redux.js.org/api/hooks#usedispatch */

  const addStudent = (student) =>
  {
    dispatch(addNewStudent(student));
  };

  const updateStudent = (student) =>
  {
    dispatch(updateOldStudent(student));
  };

  const deleteStudent = (student) =>
  {
    dispatch(deleteOldStudent(student));
  }

  const fetchPokemon = (pokemon) => {
    dispatch(fetchDataPokemon(pokemon))
  }

  /**
   * Kita return semua state dan fungsi di satu tempat ini, jadi kalau misal kita ada butuh apa2 yang berhubungan dengan state Student, kita tinggal panggil file ini aja.
   * Gak perlu manggil ke folder Redux lagi, dan lebih singkat juga. Semua yang udah ada di sini tinggal pakai.
   */
  return {
    students: useSelector((state) => state.students), /** useSelector dipakai buat akses state yang ada di store Redux. https://react-redux.js.org/api/hooks#useselector */
    fetchPokemon: fetchPokemon,
    addStudent: addStudent,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent
  };
};

export default useStudent;
