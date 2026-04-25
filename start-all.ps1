# Skardu Spring - All-in-One Startup Script

Write-Host "🌊 Starting Skardu Spring Ecosystem..." -ForegroundColor Cyan

# Check if MongoDB is running (optional but helpful)
$mongoRunning = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
if (-not $mongoRunning) {
    Write-Host "⚠️ Warning: MongoDB (mongod) is not running. Backend will start in degraded mode." -ForegroundColor Yellow
}

# Start Backend
Write-Host "🚀 Launching Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; node server.js" -WindowStyle Normal

# Start Frontend
Write-Host "🌐 Launching Frontend (Next.js)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd skardu-spring; npm run dev" -WindowStyle Normal

Write-Host "✅ Both servers are starting up!" -ForegroundColor Cyan
Write-Host "🔗 Frontend: http://localhost:3000"
Write-Host "🔗 Backend API: http://localhost:5000/api/health"
Write-Host "💡 Keep the newly opened terminal windows active." -ForegroundColor Gray
