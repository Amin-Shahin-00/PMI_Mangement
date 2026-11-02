$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path $PSScriptRoot -Parent)
$pmiNode = (Get-Command node -ErrorAction SilentlyContinue).Source
if (-not $pmiNode) { $pmiNode = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' }
if (-not (Test-Path -LiteralPath $pmiNode)) { throw 'Install Node.js 22 or later from nodejs.org, then open START_LOCAL again.' }
if (-not (Test-Path -LiteralPath 'node_modules\vinext\dist\cli.js')) {
  & $pmiNode 'vendor\npm\bin\npm-cli.js' ci --cache '.runtime-cache\npm' --include=dev --include=optional --no-audit --no-fund
  if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
}
& $pmiNode scripts/run-framework.mjs build
if ($LASTEXITCODE -ne 0) { throw 'The website build failed.' }
New-Item -ItemType Directory -Path '.runtime-cache' -Force | Out-Null
New-Item -ItemType Directory -Path '.runtime-cache/migrations' -Force | Out-Null
# The original launcher recorded the initial schema with a single marker.
if (Test-Path -LiteralPath '.runtime-cache/db-ready') {
 Set-Content -LiteralPath '.runtime-cache/migrations/0000_abnormal_stature.sql' -Value 'applied'
}
foreach ($mirrorMigration in (Get-ChildItem -LiteralPath 'drizzle' -Filter '*.sql' | Sort-Object Name)) {
 $mirrorMarker = Join-Path '.runtime-cache/migrations' $mirrorMigration.Name
 if (-not (Test-Path -LiteralPath $mirrorMarker)) {
  & $pmiNode --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file $mirrorMigration.FullName
  if ($LASTEXITCODE -ne 0) { throw 'Local database migration failed.' }
  Set-Content -LiteralPath $mirrorMarker -Value 'applied'
 }
}
Write-Host 'Open http://127.0.0.1:5180 in your browser. Keep this window open while using the local website.'
& $pmiNode scripts/run-framework.mjs dev --port 5180

