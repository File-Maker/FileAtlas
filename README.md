# FileAtlas

FileAtlas is a local Windows file-space visualizer with a deliberate Windows 95-inspired interface.

It displays drives, folders, and files as a zoomable treemap where larger boxes represent greater disk usage. FileAtlas is designed for local storage analysis, duplicate discovery, cleanup review, and safer deletion workflows.

**Copyright © 2026 Saba Iakobidze. All rights reserved.**

## Download

Download the latest Windows installer from the project’s GitHub Releases page:

`FileAtlasSetup-1.0.0.exe`

Python is bundled with FileAtlas. Users do not need to install Python separately.

## Verify the Download

Verification is optional. You can compare the installer’s SHA-256 checksum to confirm that the downloaded file is complete and unchanged.

The checksum is published in:

`SHA256SUMS.txt`

In Windows PowerShell, run:

```powershell
Get-FileHash -Algorithm SHA256 .\FileAtlasSetup-1.0.0.exe
```

Expected SHA-256:

```text
9C272EEE8063395C3F9C88677DFFF3AC4478C56C7DA113FC801B881D1F46C06E
```

## Features

- Native Windows desktop application.
- Lightweight Windows 95-inspired interface.
- Zoomable treemap for drives, folders, and files.
- Mouse-wheel visual zoom without changing directories.
- Drag-to-pan while zoomed in.
- Middle-click Back navigation.
- Refresh preserves the active search and filter text.
- Dark, light, and native themes.
- Duplicate-file marking based on matching file contents.
- Cleanup queue for reviewing multiple files and folders before deletion.
- Normal deletion uses the Windows Recycle Bin whenever supported.
- Settings and cache are stored under `%LOCALAPPDATA%\FileAtlas`.
- Protected system locations are blocked from deletion.

## System Requirements

Minimum:

- Windows 10 or Windows 11, 64-bit
- Dual-core processor
- 4 GB RAM
- 100 MB free disk space
- Permission to access the drives and folders being scanned

Recommended:

- Windows 11, 64-bit
- 8 GB RAM or more
- SSD for faster scans

Administrator rights are not required for normal use. Some protected locations may remain inaccessible unless FileAtlas is explicitly launched with elevated privileges.

No internet connection is required.

## Controls

- **Single click:** Select an item.
- **Ctrl/Shift click:** Add or remove an item from the cleanup queue.
- **Double click:** Open a folder or drive.
- **Mouse wheel:** Zoom the treemap boxes in or out.
- **Drag while zoomed:** Pan around the enlarged treemap.
- **Middle click:** Go back.
- **Right click:** Open the action menu.
- **Back / Up / breadcrumbs:** Navigate folder history.
- **Refresh:** Reload immediate contents while preserving the active filter.
- **Deep rescan:** Ignore cached folder sizes and recalculate them.
- **Search box:** Filter the current folder level by name.

## Safety

FileAtlas processes filesystem information locally. It does not upload files, filenames, directory structures, or scan results.

Normal deletion attempts to move selected items to the Windows Recycle Bin. If an item cannot be moved safely, FileAtlas reports the failure and does not silently fall back to permanent deletion.

FileAtlas blocks deletion of:

- drive roots;
- the Windows directory;
- Program Files root directories;
- ProgramData;
- Recovery;
- System Volume Information;
- `$Recycle.Bin`;
- FileAtlas application files;
- FileAtlas settings and cache files.

Items inside Program Files are treated as high-risk rather than ordinary storage. Direct deletion requires Advanced mode and a stronger warning. Use an application’s official uninstaller whenever possible.

## Notes

The first scan of a large drive can take time because Windows does not store recursive folder sizes as immediately available metadata. FileAtlas keeps the interface responsive by listing the current directory first and calculating folder sizes in the background.

Unsigned installers may trigger a Windows SmartScreen warning. FileAtlas 1.0.0 is not currently code-signed.

Use FileAtlas responsibly. To the maximum extent permitted by applicable law, the publisher is not responsible for data loss resulting from files selected for deletion by the user.

## Support

For help, email:

[iakobidzesab@gmail.com](mailto:iakobidzesab@gmail.com)

## Privacy and Third-Party Notices

- See [PRIVACY.md](PRIVACY.md) for information about local data processing.
- See [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt) for third-party software notices.
