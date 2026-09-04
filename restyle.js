import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    let stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (stat.isFile() && filepath.endsWith('.tsx')) {
      callback(filepath);
    }
  });
}

walk('./src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Kill glassmorphism
  content = content.replace(/glass-panel-hover/g, 'broadcast-panel-hover');
  content = content.replace(/glass-panel/g, 'broadcast-panel');
  
  // Kill rounded corners
  content = content.replace(/rounded-3xl/g, 'rounded-none');
  content = content.replace(/rounded-2xl/g, 'rounded-none');
  content = content.replace(/rounded-xl/g, 'rounded-none');
  content = content.replace(/rounded-lg/g, 'rounded-none');
  
  // Kill gradients and drop shadows
  content = content.replace(/shadow-2xl/g, 'shadow-none');
  content = content.replace(/shadow-xl/g, 'shadow-none');
  content = content.replace(/shadow-lg/g, 'shadow-none');
  content = content.replace(/pitch-gradient-text/g, 'text-match-green');
  content = content.replace(/gold-gradient-text/g, 'text-floodlight');
  content = content.replace(/text-emerald-400/g, 'text-match-green');
  content = content.replace(/text-emerald-500/g, 'text-match-green');
  content = content.replace(/bg-emerald-500\/10/g, 'bg-match-green/10');
  content = content.replace(/bg-emerald-500\/20/g, 'bg-match-green/20');
  content = content.replace(/bg-emerald-500/g, 'bg-match-green');
  
  content = content.replace(/border-emerald-500\/[0-9]+/g, 'border-match-green/30');
  content = content.replace(/border-slate-800/g, 'border-chalk-muted');
  content = content.replace(/border-slate-700/g, 'border-chalk-muted');
  
  content = content.replace(/bg-stadium-950/g, 'bg-pitch-950');
  
  // Replace all text-slate-400/300 with chalk variants for contrast
  content = content.replace(/text-slate-400/g, 'text-chalk-muted');
  content = content.replace(/text-slate-300/g, 'text-chalk');
  
  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log(`Updated: ${filepath}`);
  }
});
