#!/bin/bash
set -e
sleep 5
curl -s -X POST http://localhost:4000/api/tenants -H 'Content-Type: application/json' -d '{"name":"Demo Restaurant"}' || true
echo 'init-demo done'
