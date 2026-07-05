---
title: clipboard
menu:
  docs:
    parent: lua-modules
weight: 6265
aliases:
  - /docs/latest/Automation/Lua/Modules/clipboard/
---

The `clipboard` module supplies functions for reading from and writing to the clipboard.

## Usage

Import this module with <code class="inline-code language-lua">clipboard = require 'aegisub.clipboard'</code>

### clipboard.get()

Synopsis: <code class="inline-code language-lua">text = clipboard.get()</code>

Get the current contents of the clipboard as a string.
Returns `nil` if the clipboard does not currently contain text or if an error occurs.

### clipboard.get()

Synopsis: <code class="inline-code language-lua">clipboard.set(new_text)</code>

Set the clipboard contents to a string.
Returns true if the clipboard could be set, and false if an error occurred.
