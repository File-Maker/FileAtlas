# FileAtlas

FileAtlas is a local Windows file-space visualizer with a retro Windows 95-style interface.

It shows drives, folders, and files as a zoomable treemap where larger boxes use more disk space. It is designed for local storage cleanup, duplicate discovery, and safer review-before-delete workflows.

Copyright (c) 2026 Saba Iakobidze. All rights reserved.

## Download

Download the latest installer from the project releases:

`FileAtlasSetup-1.4.4.exe`

Users only need the installer. Python is bundled into the app build and is not required on the user's computer.

## Verify Download - OPTIONAL (FOR USERS THAT HAVE CYBERSECURITY CONCERNS)

The SHA-256 checksum for the current installer is in:

`SHA256SUMS.txt`

On Windows PowerShell:

```powershell
Get-FileHash -Algorithm SHA256 .\FileAtlasSetup-1.4.4.exe
```

Expected hash:

```text
74a298362c4dec23aa11d48753106cffe9ac942189a3f3f18a73d59a5a25612e
```

## Features

- Native Windows desktop app.
- Retro Windows 95-inspired UI.
- Zoomable treemap for drives, folders, and files.
- Mouse-wheel visual zoom without changing folders.
- Drag-to-pan while zoomed in.
- Middle-click treemap Back navigation.
- Refresh preserves the active search/filter text.
- FAFS background daemon tracks local filesystem events for live refresh.
- FileAtlas Base renders known FAFS catalog data immediately, then performs a catch-up scan for partial or shallow catalog views and sends that knowledge back to FAFS.
- Base retries FAFS learning once if the daemon is still starting.
- Base live refresh handles FAFS service restarts and refreshes affected views without relying on stale shallow signatures.
- User-opened folders are prioritized ahead of background FAFS catalog work so interactive browsing responds first.
- Analytics can show local mapped-file and storage-history data from the FAFS catalog even while the live daemon is starting.
- Dark, light, and native theme selection is shared by Base, Analytics, and Dev.
- FAFS startup uses lightweight health checks and defers heavier retrofit, snapshot, and deep catalog tasks.
- FileAtlas Analytics runs from the tray and shows digestible storage flow, cleanup, and drive-change history over rolling or custom time ranges.
- FileAtlas Analytics includes a 1-hour view plus 24-hour, 7-day, 30-day, 1-year, and custom date/time ranges.
- FileAtlas Dev is an optional password-protected local diagnostic tool for FAFS health, internal file inspection, timestamped event checks, and debug reports.
- FAFS performs a first local catalog, then relies on filesystem events with scheduled light/deep checks instead of repeatedly scanning whole drives.
- FAFS separates user activity from system/background noise so cache and log churn does not dominate the app.
- FAFS compares the latest saved baseline when it starts and records detected offline changes as session-start changes.
- FAFS records timestamped `.falog` event segments, `.fasnap` catalog snapshots, a SQL-compatible `.faidx` FileAtlas catalog index, local hashes, chunk metadata, disk extents, and lazy parity shards for future recovery tools.
- FAFS creates and migrates local FileAtlas internal files including `.faidx`, `.faconfig`, `.falog`, `.fasnap`, `.farm`, `.fapar`, `.fasec`, and `.fachk`.
- FileAtlas Analytics includes FAFS settings for history, performance, protection, priority folders, storage impact, cache maintenance, and advanced status.
- Duplicate-file marking based on matching file contents.
- Cleanup queue for reviewing multiple files/folders before deletion.
- Delete uses the Windows Recycle Bin.
- Settings, cache, FAFS metadata, and Analytics status are stored under `%LOCALAPPDATA%\FileAtlas`.
- Protected system locations are blocked from deletion.

## System Requirements

Minimum:

- Windows 10 or Windows 11, 64-bit
- Dual-core CPU
- 4 GB RAM
- 100 MB free disk space
- Local drive access permissions

Recommended:

- Windows 11, 64-bit
- 8 GB RAM or more
- SSD for faster scans
- Administrator access for scanning some protected locations

No internet connection is required.

## Controls

- Single click: select an item.
- Ctrl/Shift click: add or remove an item from the cleanup queue.
- Double click: open a folder or drive.
- Mouse wheel: zoom the treemap boxes in or out.
- Drag while zoomed: pan around the enlarged treemap.
- Middle click: go back.
- Delete key: move the cleanup queue to the Recycle Bin.
- Right click: open the action menu.
- Back / Up / breadcrumbs: navigate folder history.
- Refresh: reload immediate contents while keeping the current filter.
- Live refresh: FAFS detects filesystem changes and FileAtlas refreshes without clearing the search box.
- Deep rescan: ignore cached folder sizes and recalculate them.
- Search box: filter the current folder level by name.

## Safety

FileAtlas is local-only. It does not upload files or scan results.

FAFS runs locally as the FileAtlas background foundation. It watches mounted drives, records local filesystem events, tracks Recycle Bin movement, stores metadata, writes timestamped internal history files, stores lazy parity shards for future recovery tools, and exposes a local-only API on `127.0.0.1`.

Deletion uses `Send2Trash`, so normal delete actions move items to the Windows Recycle Bin instead of permanently deleting them.

FileAtlas blocks deletion of:

- drive roots;
- Windows;
- Program Files roots;
- ProgramData;
- Recovery;
- System Volume Information;
- `$Recycle.Bin`;
- FileAtlas application files;
- FileAtlas settings and cache files.

Program Files child items are treated as high-risk rather than ordinary storage. Deleting them requires Advanced mode and a stronger warning. Prefer the application's official uninstaller whenever possible.

## Notes

The first scan of a large drive can take time because Windows does not store recursive folder sizes as instant metadata. FileAtlas keeps the interface responsive by listing the current folder first, then calculating folder sizes in the background.

FileAtlas Analytics starts with FAFS and can be opened from the Start Menu or tray. Closing the Analytics window hides it to the tray. Quitting from the tray shuts down the FileAtlas background stack until FileAtlas Base is launched again.

FileAtlas Dev is optional and intended for local diagnostics. Installing it requires the developer password in the installer, and opening it requires the same password again inside the app. It can inspect FAFS health, database counts, recent history ranges, `.falog` files, `.fasnap` files, and debug reports stored on this computer.

Unsigned installers may show a Windows SmartScreen warning. FileAtlas is not code-signed yet because code-signing certificates are expensive.

Use FileAtlas responsibly. If you delete something important and then clear the Recycle Bin, the publisher is not liable for the lost data.

## Support

For help, email:

`iakobidzesab@gmail.com`

## Privacy And Notices

- See [PRIVACY.md](PRIVACY.md) for what FileAtlas stores, transmits, or shares.
- See [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt) for included third-party components.
