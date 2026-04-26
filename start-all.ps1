# Skardu Spring - Professional Ecosystem Startup Script

Write-Host "🌊 Starting Skardu Spring Ecosystem..." -ForegroundColor Cyan

# 1. Check Prerequisites
$mongoRunning = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
if (-not $mongoRunning) {
    Write-Host "⚠️ Warning: MongoDB (mongod) is not running. Backend will start in degraded mode." -ForegroundColor Yellow
}

# 2. Start Backend
Write-Host "🚀 Launching Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; if (!(Test-Path node_modules)) { npm install }; node server.js" -WindowStyle Normal

# 3. Start Frontend
Write-Host "🌐 Launching Frontend (Next.js)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; if (!(Test-Path node_modules)) { npm install }; npm run dev" -WindowStyle Normal

Write-Host "✅ Ecosystem is initializing!" -ForegroundColor Cyan
Write-Host "🔗 Frontend:    http://localhost:3000"
Write-Host "🔗 Backend API: http://localhost:5000/api/health"
Write-Host "💡 Note: Terminal windows will open for each service. Keep them active." -ForegroundColor Gray

