# Part 3 Concepts: React Fundamentals

## 1. What is React?

React is a JavaScript library for building user interfaces. It lets you describe **what** the UI should look like for a given state, and it efficiently updates the DOM when state changes.

Core idea: **UI = f(state)**. Your components are functions that take data (props + state) and return what the browser should display.

---

## 2. JSX

JSX is syntactic sugar that looks like HTML but compiles to `React.createElement()` calls.

```jsx
// JSX
const element = <h1 className="title">Hello, {name}!</h1>;

// Compiled JavaScript
const element = React.createElement('h1', { className: 'title' }, 'Hello, ', name, '!');
```

### JSX Rules

- Use `className` not `class` (it's a JS reserved word)
- Use `htmlFor` not `for` (same reason)
- All tags must be closed: `<br />` not `<br>`
- Return a single root element (or use fragments: `<>...</>`)
- JavaScript expressions go in curly braces: `{value}`, `{array.map(...)}`

---

## 3. Components and Props

A **component** is a function that returns JSX. **Props** are the arguments passed to it.

```jsx
// Functional component
function Greeting({ name, role = 'user' }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Role: {role}</p>
    </div>
  );
}

// Usage
<Greeting name="Alice" role="admin" />
<Greeting name="Bob" />  {/* role defaults to 'user' */}
```

### Rendering Lists

Always use `.map()` and provide a unique `key` prop:

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Props are Read-Only

Never mutate props inside a component. If you need to change data, lift state up or use callbacks.

---

## 4. State with useState

`useState` lets a component remember values between renders.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // initial value is 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Rules of Hooks

1. Only call hooks **at the top level** — never inside loops, conditions, or nested functions.
2. Only call hooks inside **React functions** (components or custom hooks).

### Updating Objects and Arrays in State

Never mutate state directly — always create a new value:

```jsx
// ❌ Wrong — mutates state
state.items.push(newItem);
setState(state);

// ✓ Correct — new array
setState(prev => ({ ...prev, items: [...prev.items, newItem] }));
```

---

## 5. Side Effects with useEffect

`useEffect` runs code **after** the component renders (or when dependencies change). Use it for:

- Fetching data from APIs
- Setting up subscriptions or timers
- Updating the document title

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Re-run when userId changes

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}
```

### Dependency Array

| `useEffect(() => {...}, ...)` | When it runs |
|-------------------------------|-------------|
| No array | After every render |
| `[]` | Once after first render (mount) |
| `[a, b]` | After first render, then whenever `a` or `b` changes |

---

## 6. Controlled Forms

A **controlled input** stores its value in React state, not the DOM.

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log('Submit:', email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}
```

Key pattern: `value={state}` + `onChange={e => setState(e.target.value)}`.

---

## 7. Testing React with Vitest and Testing Library

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Counter from '../src/Counter';

describe('Counter', () => {
  test('renders initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  test('increments on button click', () => {
    render(<Counter />);
    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
```

**Key queries**:
- `screen.getByText('...')` — finds element by text content
- `screen.getByRole('button', { name: /text/i })` — finds by ARIA role + accessible name
- `screen.getByTestId('...')` — finds by `data-testid` attribute
- `fireEvent.click(element)` — simulates click
- `fireEvent.change(input, { target: { value: '...' } })` — simulates typing

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| JSX | HTML-like syntax that compiles to JS; use `className`, close all tags |
| Components | Functions that take props and return JSX |
| Props | Read-only data passed from parent to child |
| useState | Hook to store values that trigger re-renders |
| useEffect | Hook to run side effects after render |
| Controlled forms | State drives input `value`; `onChange` updates state |
| Testing Library | Query by what users see (text, role) not implementation details |
