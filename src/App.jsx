import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PasswordForm from './components/PasswordForm';
import PasswordList from './components/PasswordList';
import Footer from './components/Footer';
import './App.css';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [passwords, setPasswords] = useState(() => {
    const saved = localStorage.getItem('passwords');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({ site: '', user: '', password: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('passwords', JSON.stringify(passwords));
  }, [passwords]);

  const handleAddOrEdit = () => {
    if (!formData.site || !formData.user || !formData.password) return;

    if (editingIndex !== null) {
      const updated = [...passwords];
      updated[editingIndex] = formData;
      setPasswords(updated);
      setEditingIndex(null);
    } else {
      setPasswords([...passwords, formData]);
    }

    setFormData({ site: '', user: '', password: '' });
  };

  const handleDelete = (index) => {
    const updated = passwords.filter((_, i) => i !== index);
    setPasswords(updated);

    // Show toast after delete
    toast.success('🗑️ Password deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    if (editingIndex === index) {
      setFormData({ site: '', user: '', password: '' });
      setEditingIndex(null);
    }
  };

  const handleEdit = (index) => {
    setFormData(passwords[index]);
    setEditingIndex(index);
  };

  const filteredPasswords = passwords.filter(
    (entry) =>
      entry.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

        <div className="relative min-h-screen bg-slate-950 text-white pb-24">
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>

          <div className="relative z-10">
            <Navbar />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <PasswordForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleAddOrEdit}
              editingIndex={editingIndex}
            />
            <PasswordList
              passwords={filteredPasswords}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
