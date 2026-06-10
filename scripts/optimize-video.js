#!/usr/bin/env node
/*
  Re-encode background video into efficient variants using ffmpeg.
  Input: static/img/film.original.mp4 (if exists) else static/img/film.mp4
  Outputs:
    - static/img/film.mp4         (H.264)     ~ 2000kbps, keyint=48, tune=fastdecode
    - static/img/film.webm        (VP9)       ~ 1400kbps, keyint=48, speed=4
    - static/img/film-mobile.webm (VP9 720p)  ~ 800kbps,  keyint=48, speed=4
*/
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const STATIC_IMG = path.join(ROOT, 'static', 'img');

const INPUT = fs.existsSync(path.join(STATIC_IMG, 'film.original.mp4'))
  ? path.join(STATIC_IMG, 'film.original.mp4')
  : path.join(STATIC_IMG, 'film.mp4');

const OUT_MP4 = path.join(STATIC_IMG, 'film.mp4');
const EMIT_MP4 = process.env.EMIT_MP4 === '1';
const OUT_WEBM = path.join(STATIC_IMG, 'film.webm');
const OUT_WEBM_MOBILE = path.join(STATIC_IMG, 'film-mobile.webm');

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit' });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(cmd + ' failed: ' + code))));
  });
}

async function encode() {
  if (!fs.existsSync(INPUT)) {
    console.error('Input video not found:', path.relative(ROOT, INPUT));
    process.exit(1);
  }
  // MP4 H.264 (optional)
  if (EMIT_MP4) {
    await run('ffmpeg', [
      '-y',
      '-i', INPUT,
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-b:v', '2000k',
      '-maxrate', '2200k',
      '-bufsize', '3000k',
      '-profile:v', 'high',
      '-pix_fmt', 'yuv420p',
      '-g', '48',
      '-keyint_min', '48',
      '-c:a', 'aac',
      '-b:a', '128k',
      OUT_MP4
    ]);
  }

  // WEBM VP9
  await run('ffmpeg', [
    '-y',
    '-i', INPUT,
    '-c:v', 'libvpx-vp9',
    '-b:v', '1400k',
    '-crf', '32',
    '-row-mt', '1',
    '-speed', '4',
    '-g', '48',
    '-keyint_min', '48',
    '-c:a', 'libopus',
    '-b:a', '96k',
    OUT_WEBM
  ]);

  // WEBM VP9 mobile (scale to 1280 width, keep aspect)
  await run('ffmpeg', [
    '-y',
    '-i', INPUT,
    '-vf', 'scale=min(1280,iw):-2',
    '-c:v', 'libvpx-vp9',
    '-b:v', '800k',
    '-crf', '36',
    '-row-mt', '1',
    '-speed', '4',
    '-g', '48',
    '-keyint_min', '48',
    '-c:a', 'libopus',
    '-b:a', '64k',
    OUT_WEBM_MOBILE
  ]);

  console.log('Video optimization complete.', EMIT_MP4 ? '(MP4+WEBM+WEBM_MOBILE)' : '(WEBM+WEBM_MOBILE)');
}

encode().catch((e) => {
  console.error(e);
  process.exit(1);
});


