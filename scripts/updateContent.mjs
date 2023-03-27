import fs from 'fs/promises';
import { normalizeURL } from '../utils/normalizeURL.mjs';
import { stringify } from 'yaml';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = '/Users/nicolas/Library/Mobile Documents/iCloud~md~obsidian/Documents/Studium/Module/LA1';

const PAGES_PATH = path.join(process.cwd(), 'pages');

const meta = {
    index: {
        title: 'Home',
        theme: {
            breadcrumb: false,
            toc: false,
            pagination: false,
            typesetting: 'article'
        }
    },
    '---': {
        type: 'separator'
    },
};

async function updateContent(filePath) {
    const stat = await fs.lstat(filePath);
    if (stat.isDirectory()) {
        const dest = normalizeURL(filePath.replace(CONTENT_PATH, PAGES_PATH));
        if (!(await exists(dest))) {
            await fs.mkdir(dest, { recursive: true });
        }
        const files = await fs.readdir(filePath);
        await Promise.all(files.map(async (file) => {
            const subFilePath = path.join(filePath, file);
            const stat = await fs.lstat(subFilePath);
            if (stat.isDirectory()) {
                meta[normalizeURL(file)] = path.basename(file);
            }
            await updateContent(subFilePath);
        }));
        return;
    }

    if (!filePath.endsWith('.md')) {
        return;
    }

    const dest = normalizeURL(filePath.replace(CONTENT_PATH, PAGES_PATH));

    await fs.copyFile(filePath, dest);

    const title = path.basename(filePath).replace('.md', '');
    await insertTitle(dest, title);
}

async function insertTitle(filePath, title) {
  const { data: frontMatter, content } = matter(await fs.readFile(filePath));

  frontMatter.title = title;

  const newContent = `---\n${stringify(frontMatter)}---\n\n${content}`;

  await fs.writeFile(filePath, newContent);
}

async function exists(filePath) {  
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
}

async function exec() {
    await updateContent(CONTENT_PATH);
    await fs.writeFile(path.join(PAGES_PATH, '_meta.json'), JSON.stringify(meta, null, 2), 'utf8');
}

exec();