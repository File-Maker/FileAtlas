# FileAtlas

FileAtlas is a local Windows file-space visualizer with a retro Windows 95-style interface.

It shows drives, folders, and files as a zoomable treemap where larger boxes use more disk space. It is designed for local storage cleanup, duplicate discovery, storage-history analytics, and safer review-before-delete workflows.

Copyright © 2026 Saba Iakobidze. All rights reserved.

## Download

Download the latest public installer from the project releases:

`FileAtlasSetup-1.9.3.exe`

Users only need the FileAtlas installer. Python and runtime dependencies are bundled into the app build and are not required on the user's computer.

Separate tools:

- `FileAtlasLicenseManagerSetup-1.9.3.exe` is owner-only and used to issue or inspect FileAtlas Dev licenses.
- `FileAtlasBenchmarkSetup-1.9.3.exe` installs the local benchmark/report tool for stress testing FileAtlas components.

Normal users do not need LicenseManager or Benchmark.

## Verify Download - Optional

The SHA-256 checksums for the current installers are in:

`SHA256SUMS.txt`

On Windows PowerShell:

```powershell
Get-FileHash -Algorithm SHA256 .\FileAtlasSetup-1.9.3.exe
```

Expected hashes:

```text
2b33353668fbbfcecaf2333d44e5f88ac7d7ab230f92c20eb7fcdaee23e3f9d0  installer/FileAtlasSetup-1.9.3.exe
5570ba2de74f6d42e8313c92b4db716f0436becf1a577cb896241c1b4a627a4f  installer/FileAtlasLicenseManagerSetup-1.9.3.exe
ca0630bef42892d2f609424e93a23581d13979bcffd3e007b8d8c2af65ac1d82  installer/FileAtlasBenchmarkSetup-1.9.3.exe
```

## Documentation

- [Release description](RELEASE_DESCRIPTION.md)
- [Privacy policy](PRIVACY.md)
- [Third-party notices](THIRD-PARTY-NOTICES.txt)
- [Technical articles and FileAtlas guide](fileatlas_articles/README.md)

## Features

- Native Windows desktop app.
- Retro Windows 95-inspired UI.
- Zoomable and pannable treemap for drives, folders, and files.
- Large treemaps use indexed visibility queries, bounded exact drawing, and a nonblank overview so each wheel tick does not inspect every rectangle.
- Mouse-wheel visual zoom without changing folders.
- Middle-click treemap Back navigation.
- Refresh preserves the active search/filter text.
- Size filters for above, below, and between size ranges.
- Cleanup queue for reviewing multiple files/folders before deletion.
- Delete uses the Windows Recycle Bin when possible.
- Duplicate-file marking based on matching file contents.
- Dark, light, and native theme selection shared across FileAtlas apps.
- FileAtlas Base uses FAFS catalog data when available and teaches FAFS when it scans unmapped folders.
- Base commits unacknowledged learning to a bounded local FAStore spool, then removes each record only after FAFS acknowledges the atomic batch.
- Base keeps a bounded encrypted last-known view cache so a brief FAFS restart does not blank a known treemap or force a redundant rescan.
- Last-known folder sizes render immediately while FAFS reconciles in the background.
- User-opened folders and priority paths jump ahead of background cataloging.
- NTFS volumes use saved journal cursors for incremental restart catch-up when the change journal remains continuous; complete recrawls are reserved for missing or invalid baselines.
- FAStore uses an authenticated packed catalog baseline plus a small mutable overlay so ordinary restarts do not rebuild a million-object catalog.
- Analytics reads authenticated hourly rollups for dashboard ranges while retaining raw timestamped history for forensic inspection.
- FAFS records local timestamped history, snapshots, hashes, chunk metadata, and lazy parity metadata for future FileAtlas tools.
- FAFS separates user, system, noise, and unknown activity so caches/logs do not dominate Analytics.
- FileAtlas Analytics shows storage added, cleaned up, net change, change counts, Recycle Bin activity, recent activity, and drive/folder drill-downs.
- Analytics preserves the last valid exact-range result while FAFS restarts and never replaces pending history with invented zeroes.
- Analytics supports 1-hour, 24-hour, 7-day, 30-day, 1-year, and custom date/time ranges.
- Analytics includes a shared settings hub for performance, throttling, priority folders, ignore paths, retention, cache maintenance, recovery scope, and Base settings.
- FileAtlas Dev is optional and unlocks privileged diagnostic features through a local `.falicense` certificate validated by FAFS.
- Raw native-format inspection is packaged only inside FAFS and requires a verified Dev process plus a short-lived licensed capability.
- Current FileAtlas-native storage objects use authenticated encrypted binary envelopes; legacy supported generations are read and atomically migrated to current writers.
- FileAtlas LicenseManager is a separate owner-only app for issuing and inspecting Dev licenses.
- FileAtlas Benchmark is a separate local tool for max-settings stress tests, raw data, charts, and PDF reports.
- Benchmark machine detection lists every detected GPU and reports the effective AC/DC performance mode separately from the underlying Windows power plan.
- Protected system locations are blocked from deletion, and Program Files child items are treated as high-risk.
- Settings, caches, FAFS metadata, Analytics status, licenses, and local internal files are stored under `%LOCALAPPDATA%\FileAtlas`.

## System Requirements

Minimum:

- Windows 10 or Windows 11, 64-bit
- Dual-core CPU
- 4 GB RAM
- 100 MB free disk space for the app
- Additional local disk space for FAFS history, snapshots, and optional benchmark reports
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

FileAtlas Dev is optional and intended for local diagnostics. If installed, it starts in a locked state until FAFS validates a local FileAtlas Dev `.falicense` certificate. Dev can create an offline license request (`.fareq`) and import a license (`.falicense`), but FAFS performs the authoritative validation and Dev does not decode or edit license claims.

FileAtlas Benchmark creates isolated dummy test data and local benchmark report folders. It is meant for development and release validation, not normal cleanup use.

The FileAtlas 1.8.0 maximum-stress release run used 1,000,000 catalog records, 500,000 history events, a 500,000-node treemap, and 50,000 dummy files. Analytics completed its 1-hour, 24-hour, and 7-day summaries in approximately 83-121 ms. The report package includes raw metrics and explicitly marks slower maintenance paths such as full compaction and cold forensic reads.

The FileAtlas 1.9.1 correctness pass used 322 automated tests with one intentional opt-in performance skip. A fresh authenticated FAStore bootstrap reopened in under one second on the release machine; the source FAFS process settled near 38 MB with 0% sampled idle CPU before elevated NTFS reconciliation began. These are local validation measurements, not universal performance guarantees.

Unsigned installers may show a Windows SmartScreen warning. FileAtlas is not code-signed yet because code-signing certificates are expensive.

Use FileAtlas responsibly. If you delete something important and then clear the Recycle Bin, the publisher is not liable for the lost data.

## Support

For help, email:

`iakobidzesab@gmail.com`

## Privacy And Notices

- See [PRIVACY.md](PRIVACY.md) for what FileAtlas stores, transmits, or shares.
- See [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt) for included third-party components.
