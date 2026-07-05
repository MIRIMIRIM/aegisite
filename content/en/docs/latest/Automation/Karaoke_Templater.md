---
title: Karaoke Templater
menu:
  docs:
    parent: automation
    identifier: karaoke-templater
weight: 6100
aliases:
  - /docs/latest/Automation/Karaoke_Templater/
---

**Karaoke Templater** is an [Automation](/docs/automation-overview/) script that ships with Aegisub. Its
primary purpose is to help creating [karaoke effects](/docs/karaoke-effect/)
with a specially designed template language. Karaoke Templater is already
installed and ready to use along with Aegisub.

## Tutorials: Introducing Karaoke Templater

- [A simple example](/docs/a-simple-example/)
- [Using math expressions](/docs/using-math-expressions/)
- [Using multiple template lines](#)
- [More advanced effects with positioned syllables](#)

<div class="alert alert-warning" role="alert"><strong>TODO: </strong>Plan more tutorials. Also actually write those above.</div>

## Reference

- [Declaring template and code lines](/docs/declaring-templates/)
- [Rules for when and in what order templates are run](/docs/execution-order/)
- [Template modifiers](/docs/modifiers/)
- [Inline variables (dollar-variables)](/docs/inline-variables-variables/)
- [Rules for code blocks and code lines](/docs/code-lines-and-blocks/)
- [Contents of the code block/line execution environment](/docs/execution-environment/)

Also see the [`Automation/Lua/Modules/karaskel.lua`](/docs/karaskel-lua/) section for more
information on what's in the `line` and `syl` variables, and more.

## For users of _multi-template_

If you have used the _multi-template_ script from Aegisub 1.10 you should
recognise several similar concepts in the karaoke templater, but there are also
several pitfalls. Some of them are:

- You no longer declare template lines in the Actor field but in the Effect
  field instead. You can also put much more than just `template` in there. Read
  the tutorials above for an introduction, or the reference below if you feel
  adventurous.
- Instead of using percent-signs to write Lua code blocks you use exclamation
  marks. So write `!$start+$i*30!` instead of `%$start+$i*30%`.
- The `A` global is gone, but `line` and `syl` are directly accessible. The
  escaped Lua code is no longer run in the true global environment but instead
  in its own environment, so clashes between your templates and Karaoke
  Templater itself is much less probable.
- The `return false` hack to cancel execution of a template no longer works.
  Neither does having multi-statement Lua blocks and returning from them in
  general. For the first purpose the `fxgroup` functionality has been
  introduced, and for your multi-statement needs code lines have been
  introduced.
- Instead of working with `newline` and `line` (for being-generated and
  original line) you now work with `line` and `orgline` for being-generated and
  original lines.
- The `retime` function has been introduced to make it much easier to control
  the start and end times of your generated lines.
- Lots of more fancy features. Check the tutorials or read the reference to
  learn about it all.
