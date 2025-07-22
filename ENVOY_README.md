# Using Envoy to Solve Frontend Access to RPC Backend

## Problem Description

The frontend project cannot directly access the gRPC backend service because browsers cannot communicate directly with gRPC services. gRPC uses HTTP/2 protocol and Protocol Buffers for data transmission, and browser JavaScript environments have limited support for these technologies.

## Solution

We use Envoy as a proxy to convert gRPC-Web requests from the frontend into gRPC requests that the backend server can understand. Envoy acts as a middleware, handling protocol conversion and CORS issues.

## Configuration Files

### 1. envoy.yaml

This is the Envoy proxy configuration file. Its main functions include:

- Listening on port 8080 to receive frontend requests
- Configuring CORS to allow cross-origin requests
- Forwarding requests to the backend gRPC service (127.0.0.1:50051)
- Handling protocol conversion from gRPC-Web to gRPC

### 2. docker-compose.envoy.yml

Using Docker Compose to manage the Envoy proxy and frontend application:

- `envoy` service: Runs the Envoy proxy
- `frontend` service: Runs the frontend application

## Frontend Code Modification

In the `ChatBot.vue` file, we changed the API endpoint from directly connecting to the backend:

```javascript
const KNOWLEDGE_SERVICE_URL = 'http://127.0.0.1:50051'
```

To connecting through the Envoy proxy:

```javascript
const KNOWLEDGE_SERVICE_URL = 'http://localhost:8080'
```

## Usage Methods

### Method 1: Using Docker Compose (Recommended)

1. Ensure Docker and Docker Compose are installed
2. Run in the project root directory:

```bash
docker-compose -f docker-compose.envoy.yml up
```

### Method 2: Running Envoy Separately

1. Install Envoy (refer to the [official documentation](https://www.envoyproxy.io/docs/envoy/latest/start/install))
2. Run Envoy:

```bash
envoy -c envoy.yaml
```

3. Start the frontend application in another terminal:

```bash
npm run dev
```

## Troubleshooting

1. **Cannot Connect to Backend Service**
   - Confirm that the backend gRPC service is running and listening on port 50051
   - Check if firewall settings allow communication on the relevant ports

2. **CORS Errors**
   - Check if the CORS configuration in envoy.yaml is correct
   - Ensure that frontend request headers comply with CORS policies

3. **Envoy Startup Failure**
   - Check if there are syntax errors in the envoy.yaml configuration
   - Confirm that port 8080 is not being used by other services

## Important Notes

- Consider using HTTPS in production environments to enhance security
- You may need to adjust the addresses and ports in the Envoy configuration based on your actual network environment
- If the backend service is not on the local machine (127.0.0.1), you need to modify the target address in envoy.yaml