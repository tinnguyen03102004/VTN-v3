const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Employee data scraped from VTN website
const employees = [
    { name: "Võ Trọng Nghĩa", role: "Tổng giám đốc", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2021/09/large/chaiman_hcm_vo-trong-nghiajpg_1631346952.jpg" },
    { name: "Hà Thị Mỹ Quyên", role: "Kế toán trưởng", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2021/09/large/accountant_hcm_ha-thi-my-quyen_1631347059.jpg" },
    { name: "Nguyễn Văn Tùng", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2025/08/large/architect_hcm_nguyen-van-tung-1_1755752028.jpg" },
    { name: "Mạnh Trọng Danh", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2025/10/large/hcm_architects_manh-trong-danh-1_1760327088.png" },
    { name: "Nguyễn Hoàng Dạ", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2021/09/large/architect_hcm_nguyen-hoang-da_1631767584.jpg" },
    { name: "Nguyễn Hoàng Huy", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2022/10/large/architect_hcm_-nguyen-hoang-huy_1665486370.jpg" },
    { name: "Trần Mỹ Tiên", role: "Kế toán", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2022/04/large/accountant_hcm_tran-my-tien_1649924995.jpg" },
    { name: "Trần Nguyễn Quốc Vương", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2024/04/large/architect_hcm_tran-nguyen-quoc-vuong_1711954517.jpg" },
    { name: "Phạm Văn Hoàng", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2024/10/large/architect_hcm_-pham-van-hoang_1728721580.jpg" },
    { name: "Võ Thị Thảo Uyên", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2025/10/large/architect_hcm_vo-thi-thao-uyen-1_1760327166.jpg" },
    { name: "Nguyễn Hữu Tín", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2022/10/large/architect_hcm_nguyen-huu-tin_1665569342.jpg" },
    { name: "Nguyễn Phúc Quang", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2022/03/large/architect_hcm_-nguyen-phuc-quang_1646628520.jpg" },
    { name: "Lê Phan Hoàng Kim", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2025/07/large/architect_hcm_le-phan-hoang-kim_1753410379.jpg" },
    { name: "Phạm Nhựt Anh Khoa", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2023/11/large/architect_hcm_-pham-nhut-anh-khoa_1699924357.jpg" },
    { name: "Nguyễn Mạnh Toàn", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2024/10/large/hcm_architects_nguyen-manh-toan_1728720496.png" },
    { name: "Trần Minh Luân", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2025/07/large/architect_hcm_-tran-minh-luan_1753410266.jpg" },
    { name: "Dương Quang Đạt", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2025/10/large/architect_hcm_-duong-quang-dat_1760327333.jpg" },
    { name: "Trần Minh Quang", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2025/11/large/architect_hcm_tran-minh-quang_1762932645.jpg" },
    { name: "Đặng Ngọc Kim Ngân", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2025/11/large/architect_hcm_-dang-ngoc-kim-ngan_1762932675.jpg" },
    { name: "Phạm Vũ Thiện Mỹ", role: "Kiến trúc sư", office: "hcm", photoUrl: "https://vtnarchitects.net/images/news/2025/11/large/architect_hcm_-pham-vu-thien-my_1762932696.jpg" },
    { name: "Từ Minh Đông", role: "Giám đốc VPHN", office: "hanoi", photoUrl: "https://vtnarchitects.net/images/news/2025/10/large/architect_hanoi_tu-minh-dong_new_1761530573.jpg" },
    { name: "Dương Sơn Tùng", role: "Kiến trúc sư", office: "hanoi", photoUrl: "https://vtnarchitects.net/images/news/2021/09/large/architect_hanoi_duong-son-tung_1631346557.jpg" },
    { name: "Trần Thị Huyền Trang", role: "Kiến trúc sư", office: "hanoi", photoUrl: "https://vtnarchitects.net/images/news/2025/08/large/architect_hanoi_tran-thi-huyen-trang_1755752204.jpg" },
    { name: "Nguyễn Thị Kim Hoàn", role: "Hành chính - Nhân sự", office: "hanoi", photoUrl: "https://vtnarchitects.net/images/news/2021/09/large/admin_hanoi_nguyen-thi-kim-hoan_1631767006.jpg" },
    { name: "Trần Khoa Hoàng", role: "Kiến trúc sư", office: "hanoi", photoUrl: "https://vtnarchitects.net/images/news/2025/03/large/architect_hanoi_tran-khoa-hoang_1742541831.jpg" },
    { name: "Đoàn Hải Đăng", role: "Kiến trúc sư", office: "hanoi", photoUrl: "https://vtnarchitects.net/images/news/2025/10/large/architect_hanoi_doan-hai-dang_1760326836.jpg" },
    { name: "Trịnh Khánh Duy", role: "Kiến trúc sư", office: "hanoi", photoUrl: "https://vtnarchitects.net/images/news/2025/10/large/architect_hanoi_trinh-khanh-duy_1760326918.jpg" },
    { name: "Đỗ Huyền Anh", role: "Kiến trúc sư", office: "hanoi", photoUrl: "https://vtnarchitects.net/images/news/2025/10/large/architect_hanoi_do-huyen-anh_1760327016.jpg" }
];

// Helper to convert Vietnamese name to filename
function toFilename(name) {
    // Remove Vietnamese diacritics
    const map = {
        'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
        'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
        'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
        'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
        'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
        'đ': 'd',
        'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
        'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
        'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
        'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
        'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
        'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
        'Đ': 'D'
    };

    let result = name;
    for (const [key, value] of Object.entries(map)) {
        result = result.split(key).join(value);
    }

    // Convert to lowercase, replace spaces with dashes
    return result.toLowerCase().replace(/\s+/g, '-');
}

// Download a single image
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        const request = protocol.get(url, (response) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadImage(response.headers.location, filepath)
                    .then(resolve)
                    .catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }

            const file = fs.createWriteStream(filepath);
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                resolve();
            });

            file.on('error', (err) => {
                fs.unlink(filepath, () => { }); // Delete partial file
                reject(err);
            });
        });

        request.on('error', reject);
        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

// Main download function
async function downloadAllPhotos() {
    const peopleDir = path.join(__dirname, 'people');

    // Ensure directory exists
    if (!fs.existsSync(peopleDir)) {
        fs.mkdirSync(peopleDir, { recursive: true });
    }

    console.log(`Downloading ${employees.length} staff photos...\n`);

    let success = 0;
    let failed = 0;

    for (const emp of employees) {
        const filename = toFilename(emp.name);
        const ext = path.extname(emp.photoUrl).split('?')[0] || '.jpg';
        const filepath = path.join(peopleDir, `${filename}${ext}`);

        try {
            process.stdout.write(`Downloading: ${emp.name}... `);
            await downloadImage(emp.photoUrl, filepath);
            console.log('✓');
            success++;
        } catch (err) {
            console.log(`✗ (${err.message})`);
            failed++;
        }

        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 200));
    }

    console.log(`\n========================================`);
    console.log(`Download complete!`);
    console.log(`Success: ${success} | Failed: ${failed}`);
    console.log(`Photos saved to: ${peopleDir}`);

    // Also save the employee data as JSON for later use
    const dataPath = path.join(peopleDir, 'staff-data.json');
    const dataWithFilenames = employees.map(emp => ({
        ...emp,
        filename: toFilename(emp.name) + (path.extname(emp.photoUrl).split('?')[0] || '.jpg')
    }));
    fs.writeFileSync(dataPath, JSON.stringify(dataWithFilenames, null, 2), 'utf8');
    console.log(`Staff data saved to: ${dataPath}`);
}

downloadAllPhotos().catch(console.error);
