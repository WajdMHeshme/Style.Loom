import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'


// skip on touch devices
if (!('ontouchstart' in window)) {
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);

  function handleMouseOver(e: { target: any; }) {
    const el = e.target;
    if (!el || el.dataset._cursorHandled) return;

    // get computed cursor
    const cs = window.getComputedStyle(el).cursor;
    // if browser would show pointer, override with click.png
    if (cs === 'pointer' || cs === 'url("click.png")' || cs.includes('pointer')) {
      // avoid double-setting
      if (el.style.cursor && el.style.cursor.includes('/click.png')) {
        el.dataset._cursorHandled = '1';
        return;
      }
      // save previous inline cursor to restore later
      el.dataset._prevCursor = el.style.cursor || '';
      el.style.cursor = 'url("/click.png") 16 16, pointer';
      el.dataset._cursorHandled = '1';
    }
  }

  function handleMouseOut(e: { target: any; }) {
    const el = e.target;
    if (!el || !el.dataset._cursorHandled) return;
    // restore previous inline cursor
    el.style.cursor = el.dataset._prevCursor || '';
    delete el.dataset._prevCursor;
    delete el.dataset._cursorHandled;
  }
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);