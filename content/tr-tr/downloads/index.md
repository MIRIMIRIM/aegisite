---
title: İndir
layout: downloads
---

Bu çatallanma öncesindeki son ortak sürüm **{{ site.data.version.current }}** olup, {{ site.data.version.release_date }} tarihinde yayınlanmıştır.

[Değişiklikler Günlüğü](/changelog/3-2-2/) adresinden değişiklikleri inceleyebilirsiniz.

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

## Geçerli Çatallanma Derlemeleri

Bu çatallanmanın indirme bağlantıları ayrıca güncellenecektir.

## Sözlükler

Yükleme paketinin boyutunu küçültmek amacıyla, Windows yükleyicisinde yalnızca İngilizce (ABD) yazım denetimi sözlüğü yer almaktadır. Diğer diller için sözlükler ayrı olarak indirilebilir:

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

## Eski Sürümler

<details>
<summary>İndirme Bağlantıları</summary>
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
