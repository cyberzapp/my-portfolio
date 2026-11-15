'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [['Work', '/#work'], ['Services', '/#services'], ['About', '/#about'], ['Contact', '/#contact']];
  return <header className="site-header"><div className="shell header-inner">
    <Link href="/" className="wordmark" onClick={() => setOpen(false)}>Suman Das<span>.</span></Link>
    <button type="button" className="menu-toggle" aria-controls="main-nav" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav id="main-nav" aria-label="Main" className={open ? 'nav is-open' : 'nav'} onKeyDown={event => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
      }
    }}>
      {links.map(([label, href]) => <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
  </div></header>;
}
