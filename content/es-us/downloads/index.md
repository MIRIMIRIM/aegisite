---
title: Descargas
layout: downloads
---

La versión de [última distribución](https://github.com/Aegisub/Aegisub/releases/latest) es **{{ site.data.version.current }}**, publicada {{ site.data.version.release_date }}

Vea [changelog](/changelog/{{ site.data.version.current }}) para ver la lista de cambios.

{{~ cur_version = site.data.version.current ~}}
{{~ for version in site.data.version.previous_versions ~}}
  {{~ if version.version == cur_version ~}}
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">Notes</th>
      <th scope="col">File</th>
      <th scope="col">MD5</th>
    </tr>
  </thead>
  <tbody>
    {{~ for artifact in version.artifacts ~}}
      {{~ if !artifact.isHidden ~}}
      <tr>
        <td>{{ artifact.type }}</td>
        <td>{{ artifact.notes }}</td>
        {{~ if artifact.link ~}}
        <td><a href="{{ artifact.link }}">{{ artifact.filename }}</a></td>
        {{~ else ~}}
        <td>{{ artifact.filename }}</td>
        {{~ end ~}}
        <td><code>{{ artifact.md5 }}</code></td>
      </tr>
      {{~ end ~}}
    {{~ end ~}}
  </tbody>
</table>
  {{~ end ~}}
{{~ end ~}}

## Versiones pendientes

Revise la CI build

## Diccionarios

Para reducir el tamaño de descarga, la instalación "completa" Windows incluye solo
un diccionario de inglés estadounidense para el corrector ortográfico. Todos los
demás diccionarios deben descargarse por separado:

{{~ dict_languages = site.data.dictionaries.dict_languages ~}}
{{~ first_entry = true ~}}
{{~ for dict_file in site.data.dictionaries.dict_files ~}}
  {{~ if first_entry ~}}
<h3>{{ dict_file.version }}</h3>
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Language</th>
      <th scope="col">Notes</th>
      <th scope="col">File</th>
      <th scope="col">MD5</th>
    </tr>
  </thead>
  <tbody>
    {{~ for artifact in dict_file.artifacts ~}}
    <tr>
      {{~ lang_name = "" ~}}
      {{~ for dl in dict_languages ~}}
        {{~ if dl.lang == artifact.language ~}}
          {{~ lang_name = dl.name ~}}
        {{~ end ~}}
      {{~ end ~}}
      <td>{{ lang_name }}</td>
      <td>{{ artifact.notes }}</td>
      {{~ if artifact.link ~}}
      <td><a href="{{ artifact.link }}">{{ artifact.filename }}</a></td>
      {{~ else ~}}
      <td>{{ artifact.filename }}</td>
      {{~ end ~}}
      <td><code>{{ artifact.md5 }}</code></td>
    </tr>
    {{~ end ~}}
  </tbody>
</table>
  {{~ else ~}}
<details>
<summary>{{ dict_file.version }}</summary>
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Language</th>
      <th scope="col">Notes</th>
      <th scope="col">File</th>
      <th scope="col">MD5</th>
    </tr>
  </thead>
  <tbody>
    {{~ for artifact in dict_file.artifacts ~}}
    <tr>
      {{~ lang_name = "" ~}}
      {{~ for dl in dict_languages ~}}
        {{~ if dl.lang == artifact.language ~}}
          {{~ lang_name = dl.name ~}}
        {{~ end ~}}
      {{~ end ~}}
      <td>{{ lang_name }}</td>
      <td>{{ artifact.notes }}</td>
      {{~ if artifact.link ~}}
      <td><a href="{{ artifact.link }}">{{ artifact.filename }}</a></td>
      {{~ else ~}}
      <td>{{ artifact.filename }}</td>
      {{~ end ~}}
      <td><code>{{ artifact.md5 }}</code></td>
    </tr>
    {{~ end ~}}
  </tbody>
</table>
</details>
  {{~ end ~}}
  {{~ first_entry = false ~}}
{{~ end ~}}

## Versiones previas

<details>
<summary>Enlaces a descargas</summary>
{{~ for version in site.data.version.previous_versions ~}}
  {{~ if version.version != cur_version ~}}
<h3{{~ if version.svnRevision }} title="SVN Revision: {{ version.svnRevision }}"{{~ end ~}}>
  {{~ version.display_version ?? version.version ~}}
</h3>
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">Notes</th>
      <th scope="col">File</th>
      <th scope="col">MD5</th>
    </tr>
  </thead>
  <tbody>
    {{~ for artifact in version.artifacts ~}}
      {{~ if !artifact.isHidden ~}}
      <tr>
        <td>{{ artifact.type }}</td>
        <td>{{ artifact.notes }}</td>
        {{~ if artifact.link ~}}
        <td><a href="{{ artifact.link }}">{{ artifact.filename }}</a></td>
        {{~ else ~}}
        <td>{{ artifact.filename }}</td>
        {{~ end ~}}
        <td><code>{{ artifact.md5 }}</code></td>
      </tr>
      {{~ end ~}}
    {{~ end ~}}
  </tbody>
</table>
  {{~ end ~}}
{{~ end ~}}
</details>
