// Simple script to test Envoy proxy connection

const { KnowledgeServiceClient } = require('./docs/.vitepress/components/generated/knowledge_service_grpc_web_pb.js');
const { HealthCheckRequest } = require('./docs/.vitepress/components/generated/knowledge_service_pb.js');

// Connect through Envoy proxy
const KNOWLEDGE_SERVICE_URL = 'http://localhost:8080';

// Create client instance
const client = new KnowledgeServiceClient(KNOWLEDGE_SERVICE_URL, null, {
  unaryInterceptors: [],
  streamInterceptors: []
});

// Test connection
const healthRequest = new HealthCheckRequest();

console.log('Testing connection to backend service (through Envoy proxy)...');

client.healthCheck(healthRequest, {}, (err, response) => {
  if (err) {
    console.error('Connection test failed:', err);
    console.log('\nPossible reasons:');
    console.log('1. Envoy proxy is not running - please run "npm run start-envoy"');
    console.log('2. Backend gRPC service is not running or not accessible');
    console.log('3. Envoy configuration is incorrect - check the envoy.yaml file');
    return;
  }
  
  console.log('Connection test successful!');
  console.log('Response:', response.toObject());
  console.log('\nEnvoy proxy is working properly, frontend application can connect to the backend gRPC service through it.');
});