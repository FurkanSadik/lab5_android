import React, { useState, useMemo } from 'react';
import './styles/lab-styles.css';

import StudentForm from './components/StudentForm';
import StudentControls from './components/StudentControls';
import StudentList from './components/StudentList';

const initialStudents = [
  { id: 1, name: 'Ali', grade: 85 },
  { id: 2, name: 'Siti', grade: 72 },
  { id: 3, name: 'Rahim', grade: 55 },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);

  // filter: 'all' | 'pass' | 'fail'
  const [filter, setFilter] = useState('all');
  // search term (string)
  const [search, setSearch] = useState('');
  // sortOrder: 'desc' (High→Low) or 'asc' (Low→High)
  const [sortOrder, setSortOrder] = useState('desc');

  const addStudent = (newStudent) => {
    // immutable update
    setStudents(prev => [...prev, newStudent]);
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const toggleSort = () => {
    setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };

  // Derived visibleStudents based on filter, search, sort
  const visibleStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let result = students.slice();

    // filter by pass/fail
    if (filter === 'pass') {
      result = result.filter(s => s.grade >= 60);
    } else if (filter === 'fail') {
      result = result.filter(s => s.grade < 60);
    }

    // search by name (case-insensitive substring)
    if (normalizedSearch.length > 0) {
      result = result.filter(s => s.name.toLowerCase().includes(normalizedSearch));
    }

    // sort by grade
    result.sort((a, b) => {
      if (sortOrder === 'desc') return b.grade - a.grade;
      return a.grade - b.grade;
    });

    return result;
  }, [students, filter, search, sortOrder]);

  return (
    <div className="app">
      <h1 className="header">Student Dashboard</h1>

      <StudentForm onAdd={addStudent} students={students} />

      <StudentControls
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        toggleSort={toggleSort}
      />

      {/* Empty-state when there are no students at all */}
      {students.length === 0 ? (
        <p className="no-data">Henüz öğrenci yok — yukarıdaki formu kullanın.</p>
      ) : (
        // If there are students but visibleStudents is empty, it is a search/no-match case
        visibleStudents.length === 0 ? (
          <p className="no-data">
            "<em>{search}</em>" ile eşleşen öğrenci yok
          </p>
        ) : (
          <StudentList students={visibleStudents} onDelete={deleteStudent} />
        )
      )}
    </div>
  );
}
