// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Landing from './Landing';

afterEach(cleanup);

describe('React landing page', () => {
  it('renders the product explanation and illustrative routing without authentication', () => {
    render(<Landing />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Your traffic.Your rules.');
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByText('Country matches Germany')).toBeTruthy();
    expect(screen.getByText(/Illustrative rules, not live traffic/)).toBeTruthy();
  });

  it('links every console action to the existing frontend and resolves section anchors', () => {
    render(<Landing />);
    const links = screen.getAllByRole('link', { name: 'Open console' });
    expect(links).toHaveLength(3);
    links.forEach(link => expect(link.getAttribute('href')).toBe('/'));
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      expect(document.querySelector(link.getAttribute('href'))).not.toBeNull();
    });
    expect(screen.getByRole('link', { name: 'Andromeda Security home' }).getAttribute('href')).toBe('/landing%20page/');
  });
});
