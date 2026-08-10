---
title: Modifiers
menu:
  docs:
    parent: karaoke-templater
weight: 6130
aliases:
  - /docs/latest/Automation/Karaoke_Templater/Template_modifiers/
---

Template lines and code lines can take a number of modifiers.

This is a space-separated list of words in the Effect field following the `template` or `code` keyword.

While modifiers can be combined to some extent, not all are compatible, and not all work on both code lines and for templates.

There is a special set of modifiers that declare the class of the template line or code line.

## Class declaring modifiers

Both template lines and code lines can be produced without having a class modifier. Having one is still recommended for clarity, however.

A template line without a class modifier is implicitly given the `syl` modifier.

A code line without a class modifier is implicitly given the `once` modifier.

### once

This class modifier is only valid for code lines.

Code lines with the `once` modifier are run exactly once during Karaoke Templater execution, and are always run before any other code lines or templates. They are run in the order they are declared.

"code once" lines are primarily intended to declare functions for use in templates.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,code once,function setlayer(newlayer) line.layer = newlayer; return ""; end
```

This example declares a new function that changes the Layer field in the output line.

### line _\[name\]_

This class modifier is valid for both code lines and template lines.

When used on template lines it takes an optional parameter naming the line template the template line participates in. The template name must not match any template modifier names.

Anonymous line templates (with no template name given) can not have pre-line template text.

Code lines can not be named, they must be anonymous.

Named line template lines append to the template text in the order they appear. The appending of template text happens at template parse time, not at execution time.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,code line,fxgroup.funky = line.actor == "funky"
```

This code line is run once per input line. It enables/disables an effect group named "funky" depending on the Actor field of the input line.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template line,{\r\t($start,$end,\bord0)}
```

This template line declares an anonymous line template. The effect produced will transform the border of each syllable to zero during the syllable's duration.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template line jumper,{\r\t($start,$mid,\frz-0.1)\t($mid,$end,\frz0}
```

This template line appends to a line template named "jumper"  or creates it if it doesn't exist. Together with the pre-line template example given below, this will produce a "jumping" effect for the syllables.

### pre-line _\[name\]_

This class modifier is only valid for template lines.

The `pre-line` modifier takes an optional parameter naming the line template the template line participates in. The template name must not match any template modifier names.

Anonymous line templates with only pre-line text leave the original input line text alone and just prepends the template text to the line.

Named pre-line template lines append to the pre-line template text in the order they appear. The appending of template text happens at template parse time, not at execution time.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template pre-line,{\be1}
```

This template line declares an anonymous line template, that will prepend `{\be1}`> to all matching lines.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template pre-line jumper,{\org(-10000,$y)}
```

This template line appends to the pre-line template text of a line template named "jumper", or creates it if it doesn't exist. Together with the line template example given above, this will produce a "jumping" effect for the syllables.

### syl

This class modifier is valid for both code lines and template lines.

Syl templates can not be named.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template syl,{\pos($x,$y)}
```

This template line declares a syl template that simply positions the syllable text.

### furi

This class modifier is valid for both code lines and template lines.

Furi templates can not be named.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template furi,{\pos($x,$y)}
```

This template line declares a furi template that simply positions the syllable text. It's not needed to do anything further to get correct furigana formatting.

### syl furi

It's possible to combine the `syl` and `furi` class modifiers. This results in two identical templates being generated from the template line, one syl template and one furi template.

This is the only possible combination of class modifiers, they are otherwise exclusive.

## Other modifiers

### all

Apply template to all styles, not just the one of the template line.

Applicable for both code lines and templates, and for all classes.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template syl all,{\pos($x,$y)}
```

This template will be applied to every single syllable in the entire subtitle file, regardless of the style of the line they are on.

### char

Make the template work per-character instead of per-syllable. This changes application order semantics in a significant way, see [Template execution and order](/docs/execution-order/) for details.

While this will work on code lines, it is generally not useful, see the discussion on execution order.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template syl char,{\pos($x,$y)}
Comment: 1,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template syl char,{\pos($x,$y)\bord0}
```

Every single character on the line will be positioned separately. For each syllable, each template will apply for all characters in one go, and not be applied interleaved.

For example, if there are two syllables, "ab" and "cd", and the above two templates are applied to them, the result will be 8 lines with the following text, in this order:

```ass
{\pos($x,$y)}a
{\pos($x,$y)}b
{\pos($x,$y)\bord0}a
{\pos($x,$y)\bord0}b
{\pos($x,$y)}c
{\pos($x,$y)}d
{\pos($x,$y)\bord0}c
{\pos($x,$y)\bord0}d
```

### fx _name_

Make template only apply to syllables that have the named [inline-fx](/docs/inline-effects-tutorial/). Specifying an inline-fx name is required; the name may also overlap with template modifier names though this is not recommended.

**Example**

```plaintext
Comment: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,template syl fx drop,{\move($x,$y,$x,!$y+30!,$start,$end)}
```

With this template, all syllables that have the inline-fx "drop" will get an additional line produced, where the syllables moves down 30 pixels during its duration.

All other template lines that don't have _fx_ specified will still be applied as usual to those syllables as well.

### fxgroup _name_

Declare template to be in the named effect group. Specifying an effect group name is required; the name may also overlap with template modifier names and Lua reserved words, though this is not recommended.

**Example**

There is an example of _fxgroup_ on the [Code execution environment](/docs/execution-environment/#conditional-templates-with-fxgroup/) page.

### keeptags

Specify that the original tags must be kept in the syllable after application.

This has no effect when combined with `char` or `multi`.

**Example**

```plaintext
template line keeptags: {\r\t($start,!$start+1!,\frx40)\t(!$start+1!,$end,\frx0)}
karaoke: {\k21}hi{\k10}gu{\k23}ra{\k22}shi {\k38}ga {\k37\1c&H0000FF&}na{\k37}ku
```

The syllables "tip" back over a bit during highlight. One of them ("na") is coloured differently by putting an override tag in the timed karaoke line, but the following syllables don't get it because of the customary `\r` at the start of the template.

The _notags_ modifier ensures that the special colour of the special syllable gets carried over to the output.

### multi

Make the template apply per-highlight in [multi-highlight](/docs/furigana-tutorial/) timed karaoke. This changes application order semantics in a significant way, see [Template execution and order](/docs/execution-order/) for details.

While this will work on code lines, it is generally not useful, see the discussion on execution order.

**Example**

```plaintext
template syl multi: {\an5\pos($scenter,$smiddle)\1a&HFF&\t($start,$end,\bord5\3a&HFF&)}
karaoke: {\k33}風{\k36}#{\k89}の{\k46}花{\k28}#{\k57}よ
```

The timed karaoke line uses basic multi-highlight markup, the `#` syllables, to create multi-highlight syllables. Such, the 風 (ka-ze) and 花 (ha-na) kanji each get stored as a single syllable that gets two highlights each, and the `#` characters aren't displayed at all in the applied effect. (They will still display if you try to play the timed karaoke line without applying any templates.)

The template uses the _multi_ modifier to signal that it wants to use multi-highlights instead of just one highlight/application per displayed syllable. The effect is a kind of simple "exploding border", but it explodes twice on both the 風 and 花 kanji. If the _multi_ modifier wasn't there, it would only explode once on each.

### noblank

Specify that the template will not be applied to syllables considered "blank". A syllable is considered blank if its tag-stripped text consists only of a combination of ASCII whitespace characters and ideographic fullwidth space characters, or is completely empty. A syllable is also considered empty if its duration is zero.

> _See the _notext_ modifier below for an example._

### notext

Specify that the original text will not be appended to the output line.

This is intended for use primarily with templates that output drawing tags and similar.

Not applicable for code lines.

**Example**

```plaintext
code once: sword_shape = "m 0 0 l 5 -5 l 5 -30 l 10 -30 l 10 -32 l 2 -32 l 2 -40 l -2 -40 l -2 -32 l -10 -32 l -10 -30 l -5 -30 l -5 -5 "
template syl notext noblank: {\an5\move($scenter,!$smiddle-30!,$scenter,$smiddle,!$start-20!,$start)\p2}!sword_shape!
```

The first code line defines a vector drawing shape for convenience, so it doesn't clutter up the actual template lines later on. The drawing is of a small simple sword pointing downwards. The effect itself is these small swords dropping down onto the syllables, by a move.

The template uses the _notext_ modifier to avoid getting the original syllable text shown, because it's being replaced with a vector drawing here. Also the _noblank_ modifier is used to avoid producing anything for "invisible" syllables, eg. we don't want a sword dropping down on a lone timed space, that just looks dumb.

### repeat _n_, loop _n_

Specify that the template will be applied the given number of times. Specifying the number of loops is required. The number of loops must be a constant integer number, it can not be a variable or otherwise calculated dynamically.

`repeat` and `loop` are synonymous.

Note that the execution order of looped line templates and looped syl/furi templates is different. See [Template execution and order](/docs/execution-order/) for details.

**Example**

```ass
template syl loop 4: {\move($x,$y,!$x+math.random(-30,30)!,!$y+math.random(-30,30)!,$start,$end)\alpha&Hc0&\t($start,$end,\alpha&HFF&)}
```

The _loop_ modifier is used to created 4 copies of the syllable for each time this template is run. Each of those move in a random direction, up to 30 pixels away in X and Y direction. They also fade out.

The starting alpha for each copy, `&Hc0` is chosen as 256 - (256 / 4), 4 being the number of loops made. This way, the opacity for each copy adds up to exactly 256. (Technically it should be 255, but that can't be achieved with an even number of loops.)

> _Also see the examples on the [Code execution environment](/docs/execution-environment/#loopingtemplates/) page for more advanced usage._
