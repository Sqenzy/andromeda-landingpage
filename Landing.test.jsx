// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Landing, { APP_URL } from './Landing.jsx';

afterEach(cleanup);

describe('Andromeda landing page', () => {
  it('presents the product and its platform sections', () => {
    render(<Landing />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Your traffic.Your rules.Your orbit.');
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('links every app call to action to the production app', () => {
    render(<Landing />);
    for (const name of ['Open app', 'Enter Andromeda', 'Open the app']) {
      expect(screen.getByRole('link', { name }).getAttribute('href')).toBe(APP_URL);
    }
    expect(APP_URL).toBe('https://app.andromedasecurity.eu');
  });

  it('provides valid in-page navigation and a keyboard skip link', () => {
    render(<Landing />);
    for (const link of screen.getAllByRole('link').filter(link => link.hash)) {
      expect(document.getElementById(link.hash.slice(1))).not.toBeNull();
    }
    expect(screen.getByRole('link', { name: 'Skip to content' }).getAttribute('href')).toBe('#main');
  });
});
