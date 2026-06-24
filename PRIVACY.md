# FileAtlas Privacy

FileAtlas is a local Windows desktop application for visualizing disk usage.

## Summary

FileAtlas does not collect, upload, sell, or share personal data.

FileAtlas runs locally on your computer. It scans the folders and files you open so it can display disk usage, calculate folder sizes, detect duplicate files, and manage the cleanup queue.

FileAtlas also installs FAFS, the local FileAtlas background foundation. FAFS watches mounted drives for filesystem changes and provides local storage-flow data to FileAtlas Analytics.

FileAtlas Dev is an optional password-protected local diagnostic tool. It is intended for inspecting local FAFS health, internal files, database counts, and debug reports on the same computer.

## Data FileAtlas Reads

FileAtlas may read local filesystem metadata, including:

- file and folder names;
- file and folder paths;
- file sizes;
- modified dates;
- folder contents;
- mounted drive information;
- file identifiers used to verify queued items before deletion.
- local filesystem event history, including creates, deletes, renames, moves, Recycle Bin movement, and folder activity;
- local event classification, such as user activity, system activity, and background/cache activity;
- local saved filesystem baselines used to detect changes that happened while FileAtlas was not running;
- local file identity, hash, chunk, lazy parity-shard, and disk extent metadata used to support future recovery features.
- local FAFS internal files, including the SQL-compatible `.faidx` FileAtlas catalog index, `.faconfig` settings, `.falog` event segments, `.fasnap` catalog snapshots, `.farm` recovery metadata, `.fapar` parity metadata, `.fasec` safety policy, and `.fachk` checkpoint files.

When duplicate scanning is enabled, FileAtlas may read file contents locally to calculate cryptographic hashes. FAFS may also calculate hashes for smaller files and store recovery-oriented metadata locally. FileAtlas does not upload these hashes or metadata.

## Data FileAtlas Stores

FileAtlas stores local settings and cache data under:

```text
%LOCALAPPDATA%\FileAtlas
```

This may include:

- theme and settings preferences;
- scan exclusions;
- folder-size cache data;
- local scan/cache files;
- FAFS catalog/index files, including the SQL-compatible `.faidx` FileAtlas catalog index;
- FAFS internal files such as `.faconfig` settings, `.falog` timestamped event logs, `.fasnap` catalog snapshots, `.farm` recovery metadata, `.fapar` parity metadata, `.fasec` safety policy, and `.fachk` checkpoints;
- FileAtlas Dev debug reports with the `.fadev` extension, if the user chooses to save them;
- Analytics status files;
- local event history and storage-flow summaries.

FileAtlas does not intentionally store copies of your files.

FAFS may lazily store small recovery parity shards for future FileAtlas recovery tools. Users can limit recovery and parity metadata to priority folders in FileAtlas Analytics settings. FAFS records identities, hashes, chunk records, parity groups, event history, catalog snapshots, and local catalog progress, but it does not provide file recovery by itself and does not intentionally store full backup copies of file contents.

## Data FileAtlas Transmits

FileAtlas does not transmit file names, file contents, scan results, settings, analytics, telemetry, or usage data to the publisher or to any third party.

FileAtlas does not require an internet connection.

FAFS exposes a local-only API on `127.0.0.1` for FileAtlas components on the same computer.

## Deletion

Normal delete actions use the Windows Recycle Bin whenever supported.

FAFS records when files or folders are moved to the Recycle Bin and when items appear to be removed from the Recycle Bin.

If you delete items with FileAtlas and later empty the Recycle Bin, those files may no longer be recoverable. Use FileAtlas responsibly.

## Support Email

If you contact support by email, any information you choose to include in that email is sent through your email provider.

Support email:

```text
iakobidzesab@gmail.com
```

## Third-Party Components

FileAtlas includes third-party software components. See:

```text
THIRD-PARTY-NOTICES.txt
```
