/**
 * Skill Detector Utility
 * Extracts skills from resume text using keyword matching
 */

const SKILL_KEYWORDS = {
  // Programming Languages
  programmingLanguages: [
    'JavaScript', 'Java', 'Python', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
    'Swift', 'Kotlin', 'TypeScript', 'Scala', 'R', 'MATLAB', 'Perl', 'Dart',
    'Objective-C', 'Shell', 'Bash', 'PowerShell', 'SQL', 'PL/SQL', 'T-SQL'
  ],
  
  // Web Technologies
  webTechnologies: [
    'HTML', 'CSS', 'HTML5', 'CSS3', 'SASS', 'SCSS', 'LESS', 'Bootstrap',
    'Tailwind', 'Material-UI', 'Ant Design', 'Chakra UI', 'Semantic UI'
  ],
  
  // Frontend Frameworks
  frontend: [
    'React', 'React.js', 'Angular', 'Vue', 'Vue.js', 'Next.js', 'Nuxt.js',
    'Svelte', 'Ember', 'Backbone', 'jQuery', 'Redux', 'MobX', 'Vuex',
    'React Native', 'Flutter', 'Ionic', 'Electron'
  ],
  
  // Backend Frameworks
  backend: [
    'Node.js', 'Express', 'Express.js', 'Django', 'Flask', 'FastAPI',
    'Spring', 'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET',
    '.NET Core', 'Nest.js', 'Koa', 'Hapi', 'Fastify', 'Gin', 'Echo'
  ],
  
  // Databases
  databases: [
    'MongoDB', 'MySQL', 'PostgreSQL', 'Oracle', 'SQL Server', 'SQLite',
    'Redis', 'Cassandra', 'DynamoDB', 'Firebase', 'Firestore', 'CouchDB',
    'MariaDB', 'Elasticsearch', 'Neo4j', 'InfluxDB', 'TimescaleDB'
  ],
  
  // Cloud & DevOps
  cloudDevOps: [
    'AWS', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes', 'K8s',
    'Jenkins', 'GitLab CI', 'GitHub Actions', 'CircleCI', 'Travis CI',
    'Terraform', 'Ansible', 'Chef', 'Puppet', 'Vagrant', 'Nginx', 'Apache',
    'Linux', 'Ubuntu', 'CentOS', 'Debian', 'RHEL'
  ],
  
  // Tools & Technologies
  tools: [
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Jira', 'Confluence',
    'Slack', 'Trello', 'Asana', 'Postman', 'Swagger', 'VS Code', 'IntelliJ',
    'Eclipse', 'Visual Studio', 'Webpack', 'Vite', 'Babel', 'ESLint',
    'Prettier', 'Jest', 'Mocha', 'Chai', 'Cypress', 'Selenium', 'Puppeteer'
  ],
  
  // Data Science & AI
  dataScience: [
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Keras',
    'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter',
    'NLP', 'Computer Vision', 'OpenCV', 'NLTK', 'spaCy', 'Hadoop', 'Spark',
    'Data Analysis', 'Data Visualization', 'Power BI', 'Tableau', 'Looker'
  ],
  
  // Mobile Development
  mobile: [
    'Android', 'iOS', 'React Native', 'Flutter', 'Xamarin', 'Swift', 'Kotlin',
    'SwiftUI', 'Jetpack Compose', 'Cordova', 'PhoneGap', 'Ionic'
  ],
  
  // Methodologies
  methodologies: [
    'Agile', 'Scrum', 'Kanban', 'Waterfall', 'DevOps', 'CI/CD', 'TDD',
    'Test-Driven Development', 'BDD', 'Microservices', 'REST', 'RESTful',
    'GraphQL', 'SOAP', 'gRPC', 'API Design', 'System Design', 'OOP',
    'Object-Oriented Programming', 'Functional Programming'
  ],
  
  // Soft Skills
  softSkills: [
    'Leadership', 'Team Management', 'Communication', 'Problem Solving',
    'Critical Thinking', 'Collaboration', 'Time Management', 'Adaptability',
    'Creativity', 'Project Management', 'Mentoring', 'Presentation',
    'Analytical', 'Decision Making', 'Conflict Resolution', 'Negotiation'
  ],
  
  // Other Technologies
  other: [
    'Blockchain', 'Ethereum', 'Solidity', 'Web3', 'Cryptocurrency',
    'IoT', 'AR', 'VR', 'Unity', 'Unreal Engine', 'Game Development',
    'Cybersecurity', 'Penetration Testing', 'Ethical Hacking', 'OWASP',
    'OAuth', 'JWT', 'WebSockets', 'Socket.io', 'RabbitMQ', 'Kafka'
  ]
};

/**
 * Detect skills from resume text
 * @param {string} text - Resume text content
 * @returns {Array<string>} - Array of detected skills
 */
function detectSkills(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const detectedSkills = new Set();
  const lowerText = text.toLowerCase();

  // Flatten all skill categories
  const allSkills = Object.values(SKILL_KEYWORDS).flat();

  // Check each skill keyword
  allSkills.forEach(skill => {
    // Create regex pattern for whole word matching
    const pattern = new RegExp(`\\b${skill.toLowerCase()}\\b`, 'i');
    
    if (pattern.test(lowerText)) {
      detectedSkills.add(skill);
    }
  });

  // Return as sorted array
  return Array.from(detectedSkills).sort();
}

/**
 * Calculate skill match percentage between resume and job requirements
 * @param {Array<string>} resumeSkills - Skills detected in resume
 * @param {Array<string>} requiredSkills - Required skills for job
 * @returns {number} - Match percentage (0-100)
 */
function calculateSkillMatch(resumeSkills, requiredSkills) {
  if (!requiredSkills || requiredSkills.length === 0) {
    return 0;
  }

  const resumeSkillsLower = resumeSkills.map(s => s.toLowerCase());
  const matchedSkills = requiredSkills.filter(skill => 
    resumeSkillsLower.includes(skill.toLowerCase())
  );

  return Math.round((matchedSkills.length / requiredSkills.length) * 100);
}

module.exports = {
  detectSkills,
  calculateSkillMatch,
  SKILL_KEYWORDS
};
