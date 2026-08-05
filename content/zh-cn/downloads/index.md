---
title: 下载
layout: dl
---

本分支分叉前的最后一个共同基线版本是 **{{ site.data.version.current }}**，发布于 {{ site.data.version.release_date }}。

阅读 [更新日志](/zh-cn/changelog/)（基线 [3.2.2](/changelog/3-2-2/) 仍为英文）了解变更。

{{ include "shortcodes/current-version" }}

## Beta 通道（本分支）

AmusementClub 分支的 **beta** Windows 便携版由 `exp` 分支的 GitHub Actions 构建。后续 beta 不单独发 GitHub Release，更新说明在本站维护。

- **下载**：[Aegisub CI (`exp`)](https://github.com/AmusementClub/Aegisub/actions/workflows/gha-ci.yml?query=branch%3Aexp+is%3Asuccess) 最近一次成功运行 → 产物 `aegisub-win-x64-portable.zip`（下载 artifact 需登录 GitHub）

## 词典

为减小安装包体积，Windows「完整」安装仅包含美式英语拼写检查词典，其它语种需单独下载：

{{ include "shortcodes/dictionaries" }}

## 旧版本

<details>
<summary>下载链接</summary>
{{ include "shortcodes/previous-versions" }}
</details>
