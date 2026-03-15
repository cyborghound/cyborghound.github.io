import http from 'k6/http';
import { check, sleep } from 'k6';

// Define the test configuration
export const options = {
  // Simulate 10 concurrent virtual users for 10 seconds
  vus: 10,
  duration: '10s',
  
  // Set thresholds to fail the pipeline if performance is poor
  thresholds: {
    // 95% of requests must complete within 500ms
    http_req_duration: ['p(95)<500'],
    // Less than 1% of requests can fail
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'http://127.0.0.1:4000';

export default function () {
  // Group 1: Accessing the Homepage
  const resHome = http.get(`${BASE_URL}/`);
  check(resHome, {
    'Homepage status is 200': (r) => r.status === 200,
    'Homepage loaded quickly': (r) => r.timings.duration < 500,
  });

  sleep(1);

  // Group 2: Accessing a single specific blog post
  const resPost = http.get(`${BASE_URL}/posts/getting-started-with-mermaid-diagrams/`);
  check(resPost, {
    'Blog post status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
