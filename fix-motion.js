import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all .tsx and .ts files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git')) {
      findFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to fix motion imports and usage
function fixMotionInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Skip files that are already using motion-wrapper or are the polyfill itself
  if (
    filePath.includes('motion-wrapper') ||
    filePath.includes('motion-polyfill') ||
    filePath.includes('motion-exports')
  ) {
    return false;
  }

  // Check if file uses framer-motion
  if (!content.includes('framer-motion') && !content.includes('motion.')) {
    return false;
  }

  console.log(`Fixing ${filePath}...`);

  // Replace framer-motion imports
  content = content.replace(
    /import\s*{\s*([^}]*motion[^}]*)\s*}\s*from\s*['"]framer-motion['"];?/g,
    (match, imports) => {
      const importList = imports.split(',').map(imp => imp.trim());
      const motionWrappers = [];
      const otherImports = [];

      importList.forEach(imp => {
        if (imp === 'motion') {
          // Don't import motion directly
        } else if (imp === 'AnimatePresence') {
          motionWrappers.push('SafeAnimatePresence');
        } else if (
          imp.includes('useInView') ||
          imp.includes('useScroll') ||
          imp.includes('useTransform')
        ) {
          otherImports.push(imp);
        }
      });

      // Add common motion wrappers
      motionWrappers.push(
        'MotionDiv',
        'MotionSection',
        'MotionH1',
        'MotionH2',
        'MotionP',
        'MotionButton',
        'MotionLi',
        'MotionTr',
        'MotionPath',
        'MotionLinearGradient',
        'MotionCircle',
        'MotionSvg'
      );

      let result = '';
      if (motionWrappers.length > 0) {
        result += `import { ${motionWrappers.join(', ')} } from '@/lib/motion-wrapper';\n`;
      }
      if (otherImports.length > 0) {
        result += `import { ${otherImports.join(', ')} } from 'framer-motion';\n`;
      }

      changed = true;
      return result;
    }
  );

  // Replace motion.div with MotionDiv
  content = content.replace(/<motion\.div/g, '<MotionDiv');
  content = content.replace(/<\/motion\.div>/g, '</MotionDiv>');

  // Replace motion.section with MotionSection
  content = content.replace(/<motion\.section/g, '<MotionSection');
  content = content.replace(/<\/motion\.section>/g, '</MotionSection>');

  // Replace motion.h1 with MotionH1
  content = content.replace(/<motion\.h1/g, '<MotionH1');
  content = content.replace(/<\/motion\.h1>/g, '</MotionH1>');

  // Replace motion.h2 with MotionH2
  content = content.replace(/<motion\.h2/g, '<MotionH2');
  content = content.replace(/<\/motion\.h2>/g, '</MotionH2>');

  // Replace motion.p with MotionP
  content = content.replace(/<motion\.p/g, '<MotionP');
  content = content.replace(/<\/motion\.p>/g, '</MotionP>');

  // Replace motion.button with MotionButton
  content = content.replace(/<motion\.button/g, '<MotionButton');
  content = content.replace(/<\/motion\.button>/g, '</MotionButton>');

  // Replace motion.li with MotionLi
  content = content.replace(/<motion\.li/g, '<MotionLi');
  content = content.replace(/<\/motion\.li>/g, '</MotionLi>');

  // Replace motion.tr with MotionTr
  content = content.replace(/<motion\.tr/g, '<MotionTr');
  content = content.replace(/<\/motion\.tr>/g, '</MotionTr>');

  // Replace motion.svg with MotionSvg
  content = content.replace(/<motion\.svg/g, '<MotionSvg');
  content = content.replace(/<\/motion\.svg>/g, '</MotionSvg>');

  // Replace motion.path with MotionPath
  content = content.replace(/<motion\.path/g, '<MotionPath');
  content = content.replace(/<\/motion\.path>/g, '</MotionPath>');

  // Replace motion.circle with MotionCircle
  content = content.replace(/<motion\.circle/g, '<MotionCircle');
  content = content.replace(/<\/motion\.circle>/g, '</MotionCircle>');

  // Replace motion.linearGradient with MotionLinearGradient
  content = content.replace(/<motion\.linearGradient/g, '<MotionLinearGradient');
  content = content.replace(/<\/motion\.linearGradient>/g, '</MotionLinearGradient>');

  // Replace AnimatePresence with SafeAnimatePresence
  content = content.replace(/<AnimatePresence/g, '<SafeAnimatePresence');
  content = content.replace(/<\/AnimatePresence>/g, '</SafeAnimatePresence>');

  if (changed || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${filePath}`);
    return true;
  }

  return false;
}

// Main execution
const srcDir = path.join(__dirname, 'src');
const files = findFiles(srcDir);

let totalFixed = 0;
files.forEach(file => {
  if (fixMotionInFile(file)) {
    totalFixed++;
  }
});

console.log(`\nFixed ${totalFixed} files total.`);
