import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

export const convertDoc = async () => {
  try {
    const absolutePath = path.resolve('./doc/api.yaml');
    const doc = yaml.load(fs.readFileSync(absolutePath, 'utf8'));
    return doc;
  } catch (e) {
    console.log(e);
  }
};