---
title: 下载
layout: downloads
---

[最新的版本](https://github.com/TypesettingTools/Aegisub/releases/latest)是 **{{ site.data.version.current }}**，发布于 {{ site.data.version.release_date }}

阅读 [更新日志](/changelog/{{ site.data.version.current }}) 了解更新内容

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

## 即将推出的版本

Check CI build

## 词典

为了减小安装包的体积，Windows 安装程序中仅包含了用于拼写检查的英语(美国)词典，其它语种的词典则需单独下载：

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

## 旧版本

<details>
<summary>Download Links</summary>
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
