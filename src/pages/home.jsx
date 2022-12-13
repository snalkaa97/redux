/**
 * Di sini kita bikin satu halaman contoh namanya Home. Boleh Index juga, bebas terserah sesuai preferensi masing2 aja.
 * Di halaman Home ini, kita bisa liat List, Add, Update, ataupun Delete Student.
 * Tujuannya buat demonstrasi cara kerja sama mendalami codingan Redux Toolkit dalam manajemen state.
 *
 * - ADD STUDENT
 * Caranya kita input name, age, phone, dan address, lalu klik Add.
 * ID student baru akan secara otomatis digenerate pakai module yang namanya nanoid. https://github.com/ai/nanoid
 * Kalau Student udah berhasil ditambahin, nanti di bawahnya akan muncul list Student dengan nomor urut dan informasi detail kayak name, age, phone, dan adress, dan ada juga tombol buat Delete.
 *
 * - UPDATE STUDENT
 * Cara buat update Student pertama kita copy paste ID dari Student yang sudah ada, lalu kita pastekan di input "existing id". (Ada validasi kalau ID nya ketemu di list Student, maka tombol Updatenya bisa di klik. Kalau ID nya gak ketemu, maka akan tetap ke disabled.)
 * Kemudian masukkan masukan name, age, phone, dan address baru, lalu klik Update.
 * Kalau update berhasil maka di bagian List Student, informasi detail Student dengan ID tersebut akan terupdate.
 *
 * - DELETE STUDENT
 * Klik tombol Delete buat hapus Student.
 * Student yang dihapus datanya akan hilang, dan nomor urut di List Student akan berubah sesuai urutan.
 */

import {nanoid} from 'nanoid';
import {useState, useEffect} from 'react';
import useStudent from './../hooks/useStudent';
import axios from 'axios';

const Home = () =>
{
  /**
   * Kita ambil semua state dan fungsi dari store Redux lewat useStudent buat dipakai nanti sesuai kebutuhan.
   */
  const {students, addStudent, updateStudent, deleteStudent, fetchPokemon} = useStudent();

  /**
   * Kita bikin state lokal yang akan dipakai buat ngisi form Student.
   * Nantinya data form inilah yang bakal kita lempar ke state.
   * Initial value defaultnya semuanya kosong.
   * Setiap kali user ngetik ngisi di form, kita update state form ini.
   */
  
  // Ambil data dari API
  useEffect(()=>{
    axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
    .then((response) => fetchPokemon(response.data));
  })

  const [studentForm, setStudentForm] = useState(
  {
    id: '',
    name: '',
    age: 0,
    phone: '',
    address: ''
  });

  /**
   * Ini fungsi buat mengupdate form Student.
   * Fungsi ini nerima satu parameter namanya event yang berasal dari event onChange, artinya setiap kali ada perubahan value maka fungsi ini akan ketrigger.
   */
  const handleUpdateStudentForm = (event) =>
  {
    /**
     * Karena di input ada property name (<input name="age"....) dan di statenya namanya juga sama (studentForm.age), maka kita bisa bikin inputan dinamis.
     * Logicnya, kita mau ubah value, di mana field yang ada di studentForm, itu sama dengan name yang ada di input.
     * Pertama kita buat objek baru namanya form, lalu kita copy semua property dari object studentForm, lalu kita ubah property yang mau kita ubah, hasilnya jadi kayak di bawah.
     */
    const form = /** Buat object namanya form. */
    {
      ...studentForm, /** Copy semua property dari object studentForm. */
      [event.target.name]: event.target.value /** Ubah value dari property sesuai event target name dan target value. */
    };

    /**
     * Lalu kita update state studentFormnya.
     */
    setStudentForm(form);
    fetchStudent();
  };

  /**
   * Kita bikin satu fungsi buat nge add student.
   * Fungsi ini dijalanin pas kita ngeklik tombol Add.
   */
  const handleAddStudent = (event) =>
  {
    event.preventDefault(); /** Karena ini eventnya mouse click, kita disable dulu eventnya. */

    /**
     * Terus kita langsung tambahkan Studentnya aja pakai fungsi addStudent yang dipanggil dari useStudent menggunakan data form Student yang udah diisi.
     */
    addStudent(
    {
      ...studentForm, /** Kita bikin objek baru dulu terus kita copy semua property dari studentForm. */
      id: nanoid() /** Dikarenakan idnya masih kosong dan memang gak bisa diisi manual, maka kita generate pakai modul nanoid. */
    });

    /** Student udah berhasil ditambahkan. */
  };

  /**
   * Untuk update Student, fungsinya simple juga, tinggal panggil updateStudent aja dengan parameter studentForm.
  */
  const handleUpdateStudent = (event) =>
  {
    event.preventDefault();

    updateStudent(studentForm);
  };

  /**
   * Delete Student juga simple. Cuma bedanya karena fungsi ini nempel ke masing-masing Student, jadi dia gak nerima parameter event, tapi studentnya langsung.
   * Studentnya akan didelete berdasarkan ID nya.
  */
  const handleDeleteStudent = (student) =>
  {
    deleteStudent(student);
  };

  return (
    <div>
      <form style={{marginBottom: '20px'}}>
        <input name='id' placeholder='existing id' value={studentForm.id} onChange={handleUpdateStudentForm} disabled={students.length === 0} /> {/* Disable kalau gak ada list Student */}
        <input name='name' placeholder='name' value={studentForm.name} onChange={handleUpdateStudentForm} />
        <input name='age' placeholder='age' value={studentForm.age} onChange={handleUpdateStudentForm} />
        <input name='phone' placeholder='phone' value={studentForm.phone} onChange={handleUpdateStudentForm} />
        <input name='address' placeholder='address' value={studentForm.address} onChange={handleUpdateStudentForm} />
        <button onClick={handleAddStudent}>ADD</button>
        <button onClick={handleUpdateStudent} disabled={!students.some((student) => student.id === studentForm.id)}>UPDATE</button> {/* Disable kalau ID yang diinput gak ketemu di list Student */}
      </form>
      {
        students.map((student, index) =>
        (
          <div key={student.id} style={{marginBottom: '20px'}}>
            <div>student #{index + 1}</div>
            <div>id: {student.id}</div>
            <div>name: {student.name}</div>
            <div>age: {student.age}</div>
            <div>phone: {student.phone}</div>
            <div>address: {student.address}</div>
            <button onClick={() => handleDeleteStudent(student)}>DELETE</button>
          </div>
        ))
      }
    </div>
  );
};

export default Home;
