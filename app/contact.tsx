'use client';

import { useState, type FormEvent } from 'react';
import { profile } from './projects';

export default function Contact() {
  const [draft, setDraft] = useState('');
  const [notice, setNotice] = useState('');

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const details = String(form.get('details') ?? '').trim();
    if (!name || !details) {
      setDraft('');
      setNotice('Enter your name and a short description of the project.');
      return;
    }
    setDraft(`Hi Suman,\n\n${details}\n\n${name}\n${email}`);
    setNotice('Draft ready. Open it in your email app or copy the message.');
  }

  return <form className="contact-form" method="post" onSubmit={prepare} onInput={() => {
    if (draft || notice) {
      setDraft('');
      setNotice('');
    }
  }}>
    <div className="form-row">
      <label>Name<input name="name" autoComplete="name" required maxLength={80} /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
    </div>
    <label>What are you building?<textarea name="details" rows={4} required maxLength={1400} /></label>
    <button className="button button-light" type="submit">Prepare email <span aria-hidden="true">→</span></button>
    <noscript><p>Enable JavaScript to prepare a draft, or use the email link.</p></noscript>
    <p className="form-hint">This form prepares a draft. Your email app sends it.</p>
    <p role="status" className="form-status">{notice}</p>
    {draft && <div className="draft-actions">
      <a href={`mailto:${profile.email}?subject=Project%20enquiry&body=${encodeURIComponent(draft)}`}>Open in email app ↗</a>
      <button type="button" onClick={async () => {
        try {
          await navigator.clipboard.writeText(draft);
          setNotice('Draft copied.');
        } catch {
          setNotice('Could not copy automatically. Select the text below to copy it.');
        }
      }}>Copy draft</button>
      <label className="draft-preview">Email draft<textarea readOnly value={draft} rows={5} /></label>
    </div>}
  </form>;
}
