'use client';

import { useState } from 'react';

export default function SignupPage() {
    const [form, setForm] = useState({ username: '', password: '' });
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
                setForm({ username: '', password: '' });
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
            <h1 className="mb-4 text-center">Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                Username:
                </label>
                <input
                type="username"
                className="form-control"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="username"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                Password:
                </label>
                <input
                type="password"
                className="form-control"
                id="password"
                name="password"
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
            <div className="alert alert-info mt-3" role="alert">
                {message}
            </div>
            )}
        </div>
    );
}