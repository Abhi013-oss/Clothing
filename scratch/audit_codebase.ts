import fs from 'fs';
import path from 'path';

console.log('=== STARTING SECURITY CODEBASE SCAN ===');

const ROOT_DIR = path.resolve(__dirname, '..');
const IGNORE_DIRS = new Set(['node_modules', '.next', '.git', 'scratch', 'dist', 'build']);

interface Finding {
  file: string;
  line: number;
  pattern: string;
  match: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

const findings: Finding[] = [];

const DANGEROUS_PATTERNS = [
  { regex: /dangerouslySetInnerHTML/g, name: 'dangerouslySetInnerHTML', severity: 'HIGH' as const },
  { regex: /eval\s*\(/g, name: 'eval() invocation', severity: 'CRITICAL' as const },
  { regex: /new\s+Function\s*\(/g, name: 'new Function() invocation', severity: 'HIGH' as const },
  { regex: /document\.write/g, name: 'document.write', severity: 'HIGH' as const },
  { regex: /innerHTML\s*=/g, name: 'raw innerHTML assignment', severity: 'HIGH' as const },
  { regex: /outerHTML\s*=/g, name: 'raw outerHTML assignment', severity: 'HIGH' as const },
  { regex: /['"][a-zA-Z0-9_-]{20,}\.supabase\.co['"]/g, name: 'hardcoded supabase url with key', severity: 'MEDIUM' as const },
  { regex: /['"]sbp_[a-zA-Z0-9]{30,}['"]/g, name: 'hardcoded supabase personal token', severity: 'CRITICAL' as const },
  { regex: /['"]eyJ[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}['"]/g, name: 'hardcoded JWT token', severity: 'CRITICAL' as const },
];

function scanDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath);

    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        scanDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      if (/\.(tsx?|jsx?|mjs|json|sql)$/i.test(entry.name)) {
        scanFile(fullPath, relPath);
      }
    }
  }
}

function scanFile(fullPath: string, relPath: string) {
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  // Check if file is a client component
  const isClientComponent = content.includes("'use client'") || content.includes('"use client"');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Check for service role key in client components
    if (isClientComponent && line.includes('SUPABASE_SERVICE_ROLE_KEY')) {
      findings.push({
        file: relPath,
        line: lineNum,
        pattern: 'SUPABASE_SERVICE_ROLE_KEY in Client Component',
        match: line.trim(),
        severity: 'CRITICAL',
      });
    }

    // Check dangerous patterns
    for (const p of DANGEROUS_PATTERNS) {
      if (p.regex.test(line)) {
        // Exclude test script itself
        if (!relPath.includes('test_') && !relPath.includes('audit_')) {
          findings.push({
            file: relPath,
            line: lineNum,
            pattern: p.name,
            match: line.trim(),
            severity: p.severity,
          });
        }
      }
    }
  });
}

scanDirectory(ROOT_DIR);

console.log(`Scan completed. Total findings: ${findings.length}`);
if (findings.length > 0) {
  console.log('\nFindings Details:');
  findings.forEach((f) => {
    console.log(`[${f.severity}] ${f.file}:${f.line} - ${f.pattern}: "${f.match}"`);
  });
} else {
  console.log('Zero dangerous sinks or exposed secrets found in scanned files!');
}
