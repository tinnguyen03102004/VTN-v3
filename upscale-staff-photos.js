/**
 * Script to download higher resolution staff photos from VTN website
 * The original images use 'large' folder, we'll try to get 'original' or larger versions
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Read staff data
const staffData = JSON.parse(fs.readFileSync('./people/staff-data.json', 'utf8'));

// Try to get larger image by replacing 'large' with 'original' in URL
function getHighResUrl(originalUrl) {
    // VTN uses different size folders: thumb, medium, large, original
    // Try original first
    return originalUrl.replace('/large/', '/original/');
}

// Download function with https/http support
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        console.log(`Downloading: ${path.basename(filepath)}...`);

        const file = fs.createWriteStream(filepath);

        protocol.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://vtnarchitects.net/'
            }
        }, (response) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                file.close();
                fs.unlinkSync(filepath);
                downloadImage(response.headers.location, filepath)
                    .then(resolve)
                    .catch(reject);
                return;
            }

            // If original not found (404), return false to try alternative
            if (response.statusCode === 404) {
                file.close();
                fs.unlinkSync(filepath);
                resolve(false);
                return;
            }

            if (response.statusCode !== 200) {
                file.close();
                fs.unlinkSync(filepath);
                reject(new Error(`Failed: ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                // Check if file is valid (not too small)
                const stats = fs.statSync(filepath);
                if (stats.size < 1000) {
                    fs.unlinkSync(filepath);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        }).on('error', (err) => {
            file.close();
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
            reject(err);
        });
    });
}

// Main function
async function downloadHighResPhotos() {
    const highresDir = './people-highres';

    // Create output directory
    if (!fs.existsSync(highresDir)) {
        fs.mkdirSync(highresDir, { recursive: true });
    }

    console.log(`\nDownloading ${staffData.length} staff photos in high resolution...\n`);

    let success = 0;
    let fallback = 0;
    let failed = 0;

    for (const person of staffData) {
        const filename = person.filename;
        const filepath = path.join(highresDir, filename);

        try {
            // Try original resolution first
            const originalUrl = getHighResUrl(person.photoUrl);
            let downloaded = await downloadImage(originalUrl, filepath);

            if (downloaded) {
                console.log(`  ✓ Got original: ${filename}`);
                success++;
            } else {
                // Fallback to large (which we already have)
                downloaded = await downloadImage(person.photoUrl, filepath);
                if (downloaded) {
                    console.log(`  ~ Using large: ${filename}`);
                    fallback++;
                } else {
                    console.log(`  ✗ Failed: ${filename}`);
                    failed++;
                }
            }

            // Small delay to avoid overwhelming server
            await new Promise(r => setTimeout(r, 200));

        } catch (err) {
            console.log(`  ✗ Error ${filename}: ${err.message}`);
            failed++;
        }
    }

    console.log('\n========================================');
    console.log('Download complete!');
    console.log(`Original resolution: ${success}`);
    console.log(`Large (fallback): ${fallback}`);
    console.log(`Failed: ${failed}`);
    console.log(`Photos saved to: ${path.resolve(highresDir)}`);
    console.log('\nTo replace current photos, run:');
    console.log('  copy .\\people-highres\\* .\\people\\');
}

downloadHighResPhotos().catch(console.error);
