# FileAtlas 2.0.0

FileAtlas is a local Windows storage suite with a retro Windows 95-style interface. Version 2.0.0 combines the Base treemap, the FAFS filesystem historian, FileAtlas Analytics, and optional diagnostic/development tools into one local storage-history product.

FileAtlas is designed to answer two different questions:

- **What is using my storage right now?** — Base shows drives, folders, and files as a zoomable treemap and supports cleanup, duplicate discovery, size filtering, and search.
- **What happened to my storage over time?** — FAFS and Analytics retain local filesystem history so users can inspect additions, edits, moves, renames, Recycle Bin activity, removals, and object lineage even after an item is no longer present.

Copyright © 2026 Saba Iakobidze. All rights reserved.

## Release status

**FileAtlas Core 2.0.0 is the supported release scope.**

The current Core release includes Base, FAFS, FAStore, Analytics, History, search, Dev diagnostics, licensing compatibility, and the benchmark/proving path described below. (Benchmark not included though, just update encompasses it)

### FAAV status for 2.0.0

**FileAtlas Anti-Virus (FAAV) is not being developed, validated, or supported as part of this 2.0.0 release. Do not install FAAV for normal use.**

Some existing installers, component lists, source paths, or owner tools may still contain older FAAV binaries or FAAV-related artifacts. Their presence does **not** mean FAAV is part of the supported 2.0.0 product. If you deliberately install or run those components, you do so entirely at your own risk and without any production-support or detection-effectiveness claim from this release.

No statement in this README should be read as claiming that the older FAAV build provides production-ready malware prevention, quarantine, recovery, or representative real-world antivirus effectiveness.

## Download

Public installer:

```text
FileAtlasSetup-2.0.0.exe
```

Normal users only need the FileAtlas installer. Python and application runtime dependencies are bundled into the packaged build and are not required separately on the user's computer.

Separate tools:

- `FileAtlasLicenseManagerSetup-2.0.0.exe` — owner-only tool for issuing and inspecting FileAtlas Dev licenses.
- `FileAtlasBenchmarkSetup-2.0.0.exe` — local benchmark/report tool for FileAtlas Core stress testing.
- `FileAtlasFAAVLabSetup-2.0.0.exe` — owner-only legacy/experimental FAAV Lab package. It is **not** part of the supported public 2.0.0 release and is not required by normal users.

## Verify download — optional

The SHA-256 checksums for the current installer set are recorded in:

`SHA256SUMS.txt`

On Windows PowerShell:

```powershell
Get-FileHash -Algorithm SHA256 .\FileAtlasSetup-2.0.0.exe
```

Expected SHA-256 for the current public installer:

```text
9A76586D6E40222529CA4C26A2B2C88F07A439AE158FACC9AEA0A94CC166D726
```

## Documentation

- [Release description](RELEASE_DESCRIPTION.md)
- [Privacy policy](PRIVACY.md)
- [Third-party notices](THIRD-PARTY-NOTICES.txt)

## Core features

### FileAtlas Base

- Native Windows desktop application with a retro Windows 95-inspired interface.
- Zoomable and pannable treemap for drives, folders, and files.
- Mouse-wheel visual zoom without changing folders.
- Middle-click Back navigation.
- Current-directory search/filter that stays in the open folder.
- Separate **Search all** control that searches FAFS catalog truth across known files and folders using exact, token, prefix, path, and bounded partial-name matching.
- Opening a global-search result projects its parent into the Base treemap and focuses the requested file or folder.
- Size filters for above, below, and between size ranges.
- Cleanup queue for reviewing multiple files/folders before deletion.
- Delete uses the Windows Recycle Bin when supported.
- Duplicate-file marking based on matching file-content hashes where available.
- Dark, light, and native theme selection shared across FileAtlas apps.
- Refresh preserves the active search/filter text.
- Large treemaps use indexed visibility work and bounded exact drawing so zoom/pan does not inspect every rectangle on every input event.
- Base uses FAFS catalog data when available and can teach FAFS about unresolved folders without becoming a second catalog authority.
- Completed last-known folder sizes remain visible while FAFS reconciles in the background.
- User-opened folders and priority paths are treated as high-priority work.
- One Base UI instance is used per Windows session; repeated launches restore the existing window instead of opening duplicate treemaps.
- Selected files/folders can open directly into the matching Analytics History view.

### FAFS filesystem historian

FAFS is the local FileAtlas background foundation and the authoritative source for catalog, history, continuity, and storage-flow state.

- Watches mounted NTFS volumes through the Windows USN change journal.
- Records creates, edits, deletes, replacements, moves, renames, Recycle Bin movement, and folder activity across the volume even when the affected directory is not open in Base.
- Uses saved journal cursors for incremental restart catch-up when journal continuity remains valid.
- Falls back to reconciliation/baseline work when continuity is missing or invalid rather than pretending the gap did not happen.
- Captures a process-start journal boundary and keeps newer live activity separate from older catch-up/baseline work.
- Keeps live ingestion, replay, baseline, aggregation, and recovery-metadata work in separate bounded lanes so slower maintenance work does not intentionally block the live mutation path.
- Tracks volumes independently. A drive that must baseline or catch up does not make a different healthy drive stop being current.
- Keeps loaded catalog totals visible while verification/reconciliation counters advance.
- Preserves stable native identity and lifecycle history when paths are reused, renamed, moved, recycled, or removed.
- Uses identity-led history resolution so unrelated objects are not substituted when a path can no longer be resolved safely.
- Excludes legacy history records that do not contain enough identity evidence instead of presenting them as if they belonged to the requested object.
- Stores current and last-known measurements separately; older recursive sizes are not silently promoted into current truth.
- Separates user, system, noise/background, and unknown activity so routine cache/log churn does not dominate Analytics.
- Uses authenticated packed FAStore catalog generations plus a bounded mutable overlay for normal restart performance.
- Uses timestamped local history and authenticated local storage structures for catalog/history state.
- Exposes local-only APIs on `127.0.0.1` for FileAtlas components on the same machine.

### FileAtlas Analytics

- Storage added, cleaned up, net change, change count, Recycle Bin activity, recent activity, and drive/folder drill-downs.
- 1-hour, 24-hour, 7-day, 30-day, 1-year, and custom time ranges.
- Uses timestamped history rather than “latest N events” for time-window semantics.
- Keeps the last valid exact-range result visible while FAFS starts/restarts instead of replacing a pending result with invented zeroes.
- Dedicated **History** tab for directory activity and exact item history.
- History can show exact event time, change type, size delta, path, source/capture information, native record references, and current/as-of presence state.
- History follows the same object through edits, moves, Recycle Bin movement, deletion, and parent-directory renames when native identity evidence is available.
- Search/filter controls can narrow history results by name/path and event type.
- Deleted objects can still be surfaced from retained history and correctly reported as **no longer present**.
- Shared settings hub for performance, throttling, priority folders, ignore paths, retention, cache maintenance, recovery/parity metadata scope, and Base settings.

### FileAtlas Dev and licensing

- FileAtlas Dev is optional and intended for local diagnostics, not normal storage cleanup.
- Privileged Dev features require a local FileAtlas Dev `.falicense` certificate validated by FAFS.
- Dev can inspect FAFS health, continuity, volume progress, resource pressure, FAStore/file-type counts, internal files, recent history, settings, maintenance actions, and saved `.fadev` debug reports after authorization.
- Raw native-format inspection is owned by FAFS and exposed to Dev through authenticated local capabilities rather than by shipping the raw store implementation inside the Dev client.
- LicenseManager is a separate owner-only application for issuing and inspecting Dev licenses.

### FileAtlas Benchmark

- Separate local benchmark/report application.
- Uses isolated dummy data rather than normal FileAtlas history as benchmark noise.
- Can exercise FAStore, FAFS, Analytics summaries, treemap layout, settings, licensing, and selected Dev support paths.
- Can generate local raw metrics, charts, Markdown reports, and technical PDF reports in the selected benchmark output folder.
- Benchmark results are local measurements, not universal hardware guarantees.

## Current 2.0.0 Core verification

The final Core corrective pass was validated on the installed build, not only from source.

Observed local proof included:

- installation completed successfully;
- the installed FAFS binary matched the built artifact exactly;
- an existing catalog of approximately **1.8 million items** was preserved and reopened;
- FAFS reported no watcher errors during the installation proof;
- newly created file/folder activity appeared in the historian immediately enough for the focused proof run (a create was observed in roughly **182 ms**, and tested deletions in roughly **33 ms** on that machine);
- a file lifecycle was shown as **edited → moved to Recycle Bin → removed from Recycle Bin** using the same native identity;
- the final state correctly reported the deleted object as **no longer present**;
- `C:\` history successfully handled real high-volume system/Recycling activity rather than only a quiet test drive;
- history/search returned the requested object rather than an unrelated stale identity;
- identity-less legacy records were explicitly excluded from exact item history instead of being guessed into the result.

These are local release-machine observations and are not latency or performance guarantees for other systems.

## What is deliberately not included or supported in 2.0.0

To keep the release boundary explicit:

- **FAAV is not a supported 2.0.0 component.** Do not install it for normal use. Older FAAV binaries/artifacts may still exist in the repository/installer ecosystem, but this release makes no production antivirus claim for them.
- **No representative independent antivirus evaluation is claimed.** There is no supported 2.0.0 statement that FAAV will detect or stop real-world malware.
- **FileAtlas Recovery is not a user-facing file-recovery product in this release.** FAFS can retain recovery-oriented identity/hash/chunk/parity metadata, but FAFS by itself does not promise that deleted files can be restored.
- **FileAtlas Dev is not a universal file editor.** Generic/raw inspection exists for diagnostics, but this release does not claim built-in PDF editing, Office editing, CAD, Photoshop-like editing, or a universal binary editor/viewer.
- **No cloud sync, cloud analytics, remote telemetry, or online account is required or provided by Core.** FileAtlas remains local-only.
- **The public installer is not code-signed yet.** Windows SmartScreen may warn about the unsigned installer.
- **Owner-only tools are not normal-user requirements.** LicenseManager and the FAAV Lab are separate from the normal public workflow.

## System requirements

Minimum:

- Windows 10 or Windows 11, 64-bit
- Dual-core CPU
- 4 GB RAM
- Local drive access permissions
- Additional local disk space for FAFS catalog/history and any enabled recovery/parity metadata

Recommended:

- Windows 11, 64-bit
- 8 GB RAM or more
- SSD for faster scans and history work
- Administrator access when scanning or diagnosing protected locations

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
- Search box: filter the current folder level by name without leaving the directory.
- Search all: search FAFS-cataloged files and folders across known storage, then focus the selected result in the treemap.
- History: open Analytics history inspection for the selected file or folder.

## Safety

FileAtlas Core is local-only. It does not upload files, filenames, scan results, analytics, hashes, settings, licenses, benchmark results, or debug reports.

Deletion uses the Windows Recycle Bin whenever supported. FileAtlas blocks or strongly warns around high-risk system locations, including drive roots, Windows, Program Files roots, ProgramData, Recovery, System Volume Information, `$Recycle.Bin`, and FileAtlas's own application/data locations.

Program Files child items are treated as high-risk. Prefer the application's official uninstaller whenever possible.

If you delete something important and later empty the Recycle Bin, the file may no longer be recoverable. FileAtlas history can retain the fact that an object existed and what happened to it; that is not the same thing as retaining a full backup copy of the file.

## Notes

The first scan or reconciliation of a large drive can take time because Windows does not store recursive folder sizes as instant metadata. FileAtlas keeps the UI responsive by publishing known state first and letting deeper work continue in the background.

FileAtlas Analytics can run in the tray and reuse the existing instance instead of creating duplicate dashboards.

FileAtlas Dev is optional. It remains locked until FAFS validates a local Dev license.

Unsigned installers may show a Windows SmartScreen warning. FileAtlas is not code-signed yet.

## Support

For help, email:

```text
iakobidzesab@gmail.com
```

## Privacy and notices

- See [PRIVACY.md](PRIVACY.md) for what FileAtlas reads, stores, transmits, or shares.
- See [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt) for included third-party components.
