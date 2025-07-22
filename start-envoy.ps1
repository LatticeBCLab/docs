# PowerShell script for starting Envoy proxy

# Check if Envoy is installed
try {
    $envoyVersion = envoy --version
    Write-Host "Found Envoy: $envoyVersion"
}
catch {
    Write-Host "Error: Envoy not found. Please install Envoy proxy first." -ForegroundColor Red
    Write-Host "Installation guide: https://www.envoyproxy.io/docs/envoy/latest/start/install" -ForegroundColor Yellow
    exit 1
}

# Start Envoy proxy
Write-Host "Starting Envoy proxy..." -ForegroundColor Green
Write-Host "Envoy will listen on port 8080 and proxy requests to 127.0.0.1:50051" -ForegroundColor Cyan

try {
    envoy -c envoy.yaml
}
catch {
    Write-Host "Error starting Envoy: $_" -ForegroundColor Red
    exit 1
}