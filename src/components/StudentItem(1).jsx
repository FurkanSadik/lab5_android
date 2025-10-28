import React from 'react';

export default function StudentItem({ student, onDelete }) {
    const passed = student.grade >= 60;
    const rootClass = `student-item ${passed ? 'student-pass' : 'student-fail'}`;

    return (
        <li className={rootClass}>
            <div>
                <span className="student-name">{student.name}</span>
                <span className="student-grade"> {student.grade}</span>
                <span className="student-status"> {passed ? 'Pass' : 'Fail'}</span>
            </div>

            <div>
                <button
                    className="delete-btn"
                    type="button"
                    onClick={() => onDelete(student.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
