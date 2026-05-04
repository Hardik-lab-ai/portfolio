#!/bin/bash
cd "$(dirname "$0")"
export PATH="/tmp/node-v20.11.0-darwin-arm64/bin:/usr/local/bin:/usr/bin:$PATH"

echo ""
echo "🏗️  Starting Hardik Nakrani Portfolio on http://localhost:3000"
echo ""

# Kill any existing process on 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
sleep 1

# Start next dev in background
npx next dev --port 3000 &
SERVER_PID=$!

# Wait a bit then open browser
sleep 4
open http://localhost:3000

echo "✅  Portfolio running at http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""

wait $SERVER_PID
