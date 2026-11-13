# FileAtlas 2.0.0 Privacy

FileAtlas is a local Windows storage application and filesystem historian.

## Summary

FileAtlas Core does not collect, upload, sell, or share personal data.

FileAtlas runs locally on your computer. It scans local folders and files so it can display disk usage, calculate folder sizes, detect duplicate files, maintain the cleanup queue, search known filesystem state, and show historical storage activity.

FAFS is the local FileAtlas background foundation. It watches mounted drives for filesystem changes and provides local catalog, history, continuity, and storage-flow data to FileAtlas Base and Analytics.

FileAtlas Dev is an optional local diagnostic tool. Privileged Dev features require a local FileAtlas Dev `.falicense` certificate that FAFS validates on the same computer.

FileAtlas LicenseManager is a separate owner-only local tool for issuing and inspecting FileAtlas Dev licenses. Normal users do not need it.

FileAtlas Benchmark is a separate local benchmark/report tool. It creates isolated dummy test data and local reports so FileAtlas components can be stress-tested without using normal FileAtlas history as benchmark noise.

### FAAV privacy note for 2.0.0

FileAtlas Anti-Virus (FAAV) is **not being developed, validated, or supported as part of the FileAtlas 2.0.0 Core release**. Normal users should not install it.

Older FAAV binaries, installer options, source paths, or owner-only FAAV Lab artifacts may still exist. If a user deliberately installs an older FAAV build, the local-data behavior described in the FAAV-specific sections below explains what that legacy/experimental component was designed to read/store locally. This privacy disclosure does **not** make FAAV a supported 2.0.0 feature and does not make any claim about malware-detection effectiveness or production safety.

## Data FileAtlas Core reads

FileAtlas Core may read local filesystem metadata, including:

- file and folder names;
- file and folder paths;
- file sizes;
- created/modified timestamps where available;
- folder contents;
- mounted drive information;
- file identifiers used to verify identity and queued items before deletion;
- local filesystem event history, including creates, edits, deletes, replacements, renames, moves, Recycle Bin movement, and folder activity;
- local event classification, such as user activity, system activity, background/cache activity, and unknown activity;
- local saved filesystem baselines and journal cursors used to detect changes that happened while FileAtlas was not running;
- stable local file/folder identity used to preserve lineage through moves, renames, Recycle Bin transitions, and deletion;
- local hash/chunk/recovery-oriented metadata where the relevant optional Core feature is enabled;
- local FAFS internal files, including FAStore catalog/history structures, settings, event segments, snapshots, checkpoints, recovery/parity metadata, and safety/license state;
- local FileAtlas Dev license state, including installation identity and local certificate/activation state used by FAFS;
- local FileAtlas LicenseManager private owner keys, if the owner-only LicenseManager is used on this computer;
- local FileAtlas Benchmark report folders, raw metrics, charts, PDFs, and dummy benchmark files, if Benchmark is used.

When duplicate scanning is enabled, FileAtlas may read file contents locally to calculate cryptographic hashes. FAFS may also calculate hashes or recovery-oriented metadata locally where configured. FileAtlas Core does not upload these hashes or metadata.

Current FileAtlas-native storage generations use authenticated encrypted binary envelopes for protected settings/history/catalog/checkpoint and related internal state. Supported older local generations may be read and migrated by FAFS. Encryption is used for local integrity/access separation; it does not cause any data to be uploaded.

## Data FileAtlas Core stores

FileAtlas stores local settings and application data under:

```text
%LOCALAPPDATA%\FileAtlas
```

This may include:

- theme and settings preferences;
- scan exclusions and priority paths;
- folder-size/cache data;
- FAStore catalog/history/index files owned by FAFS;
- FAFS internal event/history, snapshot, settings, checkpoint, recovery/parity, and safety/license files;
- FileAtlas Dev debug reports with the `.fadev` extension, if the user chooses to save them;
- Analytics status/cache files;
- local event history and storage-flow summaries;
- bounded encrypted last-known Base and Analytics caches used to keep completed views visible while FAFS starts or restarts;
- optional FileAtlas Dev license request files (`.fareq`) and imported license files (`.falicense`);
- optional FileAtlas LicenseManager key backups (`.fakeybackup`) and issued license files (`.falicense`) when the owner chooses to create/save them;
- optional FileAtlas Benchmark reports under the selected benchmark output folder, by default `Documents\FileAtlas Benchmarks`.

FileAtlas does not intentionally store full backup copies of your normal files.

FAFS may retain identity, hashes, chunk records, event history, catalog snapshots, and optional recovery/parity metadata. **FileAtlas 2.0.0 does not ship a supported user-facing file-recovery product, and FAFS by itself does not promise that deleted files can be restored.**

## Data FileAtlas Core transmits

FileAtlas Core does not transmit file names, file contents, scan results, settings, analytics, telemetry, hashes, debug reports, or usage data to the publisher or to any third party.

FileAtlas Core does not require an internet connection.

FAFS exposes local-only APIs on:

```text
127.0.0.1
```

for FileAtlas components on the same computer. Privileged Dev requests use authenticated local sessions/capabilities and are not sent over the internet.

FileAtlas Dev can create an offline license request file (`.fareq`). That request can contain an installation identifier and public-key information required to issue a license for that installation. FileAtlas does not send the request automatically; the user must manually choose to share it.

FileAtlas LicenseManager does not upload requests, licenses, customer names, notes, or owner keys. It opens and saves local files only when the owner chooses those files.

FileAtlas Benchmark does not upload benchmark results. It writes local raw data, charts, PDFs, and isolated dummy files only to the selected benchmark output folder.

## Search and history privacy

FileAtlas 2.0.0 can search current FAFS catalog state and retained local history.

That means FileAtlas may locally retain evidence that a file/folder previously existed even after the object has been moved, renamed, recycled, or deleted. Exact item-history results are identity-led where native identity is available. Legacy history records that do not contain enough identity evidence may be excluded instead of being guessed into an exact object trail.

This retained history remains local to the computer unless the user manually exports/shares a report or other file.

## Deletion

Normal delete actions use the Windows Recycle Bin whenever supported.

FAFS records when files or folders move to the Recycle Bin and when items appear to be removed from it.

If you delete items with FileAtlas and later empty the Recycle Bin, those files may no longer be recoverable. Historical metadata showing that an item existed is not a backup of the item's contents.

When uninstalling FileAtlas, users may choose to preserve local data or remove selected FileAtlas local data categories depending on the uninstaller options present in that build.

When uninstalling FileAtlas Benchmark, users can optionally remove saved benchmark reports from `Documents\FileAtlas Benchmarks`.

## Unsupported legacy/experimental FAAV data behavior

This section exists only for transparency if a user deliberately installs an older FAAV component that may still be present in the repository/installer ecosystem.

The older FAAV design may read or store local items such as:

- bounded NTFS journal records;
- local Windows file/process telemetry;
- local behavioral feature/state data;
- telemetry cursors and attribution-confidence data;
- local protection decisions/history;
- static-scan findings;
- local quarantine records;
- local settings/model/integrity state.

The older FAAV design was intended to keep those records local and to use local-only control APIs rather than cloud reputation/sample-upload services.

Owner-only FAAV Lab workspaces may contain local datasets, inert simulations, training/calibration runs, model packs, signing-key references, release backups, and reports under an owner-selected local workspace.

Again: **FAAV is not a supported FileAtlas 2.0.0 feature. Normal users should not install it.** This section is a privacy disclosure for legacy/experimental artifacts, not an endorsement or release claim.

## Support email

If you contact support by email, any information you choose to include in that email is sent through your email provider.

Support email:

```text
si@file-atlas.com
```

## Third-party components

FileAtlas includes third-party software components. See:

```text
THIRD-PARTY-NOTICES.txt
```
