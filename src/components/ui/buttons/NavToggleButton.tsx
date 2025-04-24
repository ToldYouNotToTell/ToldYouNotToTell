'use client';
import React from 'react';
import { toggleNavMenu } from '@/lib/uiActions';

export default function NavToggleButton() {
  return (
    <button className="nav-toggle" onClick={() => toggleNavMenu()}>
      <i className="fas fa-bars"></i>
    </button>
  );
}