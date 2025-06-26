'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap'

export default function SignupPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setMessage('Signup successful!');
                setForm({ email: '', password: '' });
            } else {
                const data = await res.json();
                setMessage(data.error || 'Signup failed.');
            }
        } catch {
            setMessage('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: 400, margin: '2rem auto' }}>
            <h1 className="mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                Email:
                </label>
                <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                Password:
                </label>
                <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
            </button>
            </form>
            {message && (
            <div className="alert mt-3" role="alert" style={{ color: message.includes('successful') ? 'green' : 'red' }}>
                {message}
            </div>
            )}
        </div>
    );
}