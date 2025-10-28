import React, { useState } from 'react';

export default function StudentForm({ onAdd, students }) {
    // StudentForm kendi controlled state'lerini tutar (spec gereği)
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [error, setError] = useState('');

    const resetForm = () => {
        setName('');
        setGrade('');
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedName = name.trim();

        // validation: name not empty
        if (trimmedName === '') {
            setError('İsim boş olamaz.');
            return;
        }

        // grade numeric and between 0 and 100
        const numGrade = Number(grade);
        if (Number.isNaN(numGrade) || numGrade < 0 || numGrade > 100) {
            setError('Grade 0 ile 100 arasında bir sayı olmalı.');
            return;
        }

        // duplicate name (case-insensitive)
        const exists = students.some(s => s.name.trim().toLowerCase() === trimmedName.toLowerCase());
        if (exists) {
            setError('Bu isimde bir öğrenci zaten var.');
            return;
        }

        // all good -> call onAdd
        onAdd({ id: Date.now(), name: trimmedName, grade: numGrade });
        resetForm();
    };

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <input
                className="input"
                placeholder="Name"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
            />
            <input
                className="input input-grade"
                placeholder="Grade"
                value={grade}
                onChange={(e) => { setGrade(e.target.value); setError(''); }}
            />
            <button type="submit" className="btn">Add</button>
            {error && <span className="form-error">{error}</span>}
        </form>
    );
}
