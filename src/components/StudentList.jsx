import React from 'react';
import StudentItem from './StudentItem';

export default function StudentList({ students, onDelete }) {
    // Milestone 3: StudentList kendi içinde empty-state değil; App bunu üst seviyede render ediyor.
    // Ancak spec Milestone 1 istiyordu ki StudentList sadece <ul className="student-list"> render etsin.
    // Burada students prop'u doğrudan mapleniyor.
    return (
        <ul className="student-list">
            {students.map(student => (
                <StudentItem key={student.id} student={student} onDelete={onDelete} />
            ))}
        </ul>
    );
}
