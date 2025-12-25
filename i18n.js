(() => {
    const STORAGE_KEY = 'vtn_lang';
    const SUPPORTED = ['vi', 'en'];

    const DICT = {
        vi: {
            'lang.switchToEn': 'Chuyển sang tiếng Anh',
            'lang.switchToVi': 'Chuyển sang tiếng Việt',

            'title.gallery': 'VTN Architects - Dự án',
            'title.about': 'Giới thiệu - VTN Architects',

            'nav.green': 'Xanh',
            'nav.bamboo': 'Tre',
            'nav.about': 'Giới thiệu',

            'menu.projects': 'Dự án',
            'menu.about': 'Giới thiệu',
            'menu.people': 'Nhân sự',
            'menu.contact': 'Liên hệ',

            'project.back': 'Quay lại',
            'project.meta.location': 'Địa điểm',
            'project.meta.year': 'Năm hoàn thành',
            'project.meta.awards': 'Giải thưởng',

            'about.hero': 'Giới thiệu',
            'about.founder': 'Người sáng lập',
            'about.founder.name': 'VÕ TRỌNG NGHĨA',
            'about.founder.photoAlt': 'KTS Võ Trọng Nghĩa',
            'about.founder.title': 'Nhà sáng lập',
            'about.founder.bio': 'Võ Trọng Nghĩa sinh năm 1976, tốt nghiệp Đại học Tokyo. Ông là người tiên phong trong phong trào "Greening the City" (Trả lại màu xanh cho thành phố) tại Việt Nam, với triết lý sử dụng tre như "thép xanh của thế kỷ 21". Các công trình của ông kết hợp hài hòa giữa kiến trúc hiện đại và thiên nhiên, mang đến không gian sống bền vững.',
            'about.founder.awardsLabel': 'Giải thưởng tiêu biểu',
            'about.profile': 'Hồ sơ',
            'about.partners': 'Nhân sự',
            'about.contacts': 'Liên hệ',
            'about.imageAlt': 'Triết lý VTN',

            'about.profile.lead': 'VTN Architects (Võ Trọng Nghĩa Architects) được thành lập năm 2006, là một trong những văn phòng kiến trúc hàng đầu tại Việt Nam với các văn phòng tại TP. Hồ Chí Minh và Hà Nội.',
            'about.profile.p1': 'Chúng tôi tin rằng kiến trúc có thể tạo ra những thay đổi tích cực cho xã hội và môi trường. Bằng việc kết hợp vật liệu truyền thống với kỹ thuật hiện đại, VTN Architects hướng đến những không gian sống xanh, bền vững và gắn kết với thiên nhiên.',
            'about.profile.p2': 'Các công trình của chúng tôi đã nhận được nhiều giải thưởng quốc tế và được giới chuyên môn đánh giá cao về tính sáng tạo cũng như trách nhiệm với cộng đồng.',

            'about.group.architects': 'Kiến trúc sư — TP. Hồ Chí Minh',
            'about.group.admin': 'Hành chính — TP. Hồ Chí Minh',
            'about.group.hanoi': 'Văn phòng Hà Nội',
            'about.role.chairman': 'Chủ tịch',
            'about.role.architect': 'Kiến trúc sư',
            'about.role.chiefAccountant': 'Kế toán trưởng',
            'about.role.accountant': 'Kế toán',
            'about.role.adminStaff': 'Hành chính',
            'about.role.directorHanoi': 'Giám đốc',
            'about.office.hcm': 'HỒ CHÍ MINH',
            'about.office.hq': 'HỒ CHÍ MINH',
            'about.office.hanoi': 'HÀ NỘI',
            'about.partner.photoAlt': 'Đối tác',

            // People names (Vietnamese with diacritics, uppercase)
            'people.nguyen-van-tung': 'NGUYỄN VĂN TÙNG',
            'people.manh-trong-danh': 'MẠNH TRỌNG DANH',
            'people.nguyen-hoang-da': 'NGUYỄN HOÀNG DẠ',
            'people.nguyen-hoang-huy': 'NGUYỄN HOÀNG HUY',
            'people.tran-nguyen-quoc-vuong': 'TRẦN NGUYỄN QUỐC VƯƠNG',
            'people.pham-van-hoang': 'PHẠM VĂN HOÀNG',
            'people.vo-thi-thao-uyen': 'VÕ THỊ THẢO UYÊN',
            'people.nguyen-huu-tin': 'NGUYỄN HỮU TÍN',
            'people.le-phan-hoang-kim': 'LÊ PHAN HOÀNG KIM',
            'people.pham-nhut-anh-khoa': 'PHẠM NHỰT ANH KHOA',
            'people.nguyen-phuc-quang': 'NGUYỄN PHÚC QUANG',
            'people.nguyen-manh-toan': 'NGUYỄN MẠNH TOÀN',
            'people.tran-minh-luan': 'TRẦN MINH LUÂN',
            'people.duong-quang-dat': 'DƯƠNG QUANG ĐẠT',
            'people.tran-minh-quang': 'TRẦN MINH QUANG',
            'people.dang-ngoc-kim-ngan': 'ĐẶNG NGỌC KIM NGÂN',
            'people.pham-vu-thien-my': 'PHẠM VŨ THIỆN MỸ',
            'people.ha-thi-my-quyen': 'HÀ THỊ MỸ QUYÊN',
            'people.tran-my-tien': 'TRẦN MỸ TIÊN',
            'people.tu-minh-dong': 'TỪ MINH ĐÔNG',
            'people.duong-son-tung': 'DƯƠNG SƠN TÙNG',
            'people.tran-thi-huyen-trang': 'TRẦN THỊ HUYỀN TRANG',
            'people.tran-khoa-hoang': 'TRẦN KHOA HOÀNG',
            'people.doan-hai-dang': 'ĐOÀN HẢI ĐĂNG',
            'people.trinh-khanh-duy': 'TRỊNH KHÁNH DUY',
            'people.do-huyen-anh': 'ĐỖ HUYỀN ANH',
            'people.nguyen-thi-kim-hoan': 'NGUYỄN THỊ KIM HOÀN',
            'people.hoverToView': 'Di chuột để xem',

            // Roles (Vietnamese)
            'role.architect': 'Kiến trúc sư',
            'role.chiefAccountant': 'Kế toán trưởng',
            'role.accountant': 'Kế toán',
            'role.directorHanoi': 'Giám đốc',
            'role.hrAdmin': 'Hành chính - Nhân sự',

            'contact.hqOffice': 'Trụ sở chính',
            'contact.hanoiOffice': 'Văn phòng đại diện',
            'contact.tel': 'ĐT',
            'contact.viewMap': 'Xem bản đồ',


            'loader.progressText': 'Đang tải trải nghiệm',
            'loader.loadingAssets': 'Đang tải nội dung',
            'loader.almostThere': 'Sắp xong',
            'loader.ready': 'Sẵn sàng',
            'loader.hint': 'Kiến trúc bền vững',
            'loader.tagline.architects': 'Kiến trúc sư',
            'loader.tagline.green': 'Xanh',
            'loader.tagline.bamboo': 'Tre',

            'lightbox.zoomedImageAlt': 'Ảnh phóng to',
            'lightbox.close': 'Đóng',
            'lightbox.prev': 'Ảnh trước',
            'lightbox.next': 'Ảnh sau',

            'view.list': 'Danh sách',
            'view.space': 'Không gian',
            'view.3d': '3D',
            'view.grid': 'Lưới',

            'filter.all': 'Tất cả',
            'filter.hcm': 'TP. Hồ Chí Minh',
            'filter.hanoi': 'Hà Nội',
        },
        en: {
            'lang.switchToEn': 'Switch to English',
            'lang.switchToVi': 'Chuyển sang tiếng Việt',

            'title.gallery': 'VTN Architects - Projects',
            'title.about': 'About - VTN Architects',

            'nav.green': 'Green',
            'nav.bamboo': 'Bamboo',
            'nav.about': 'About',

            'menu.projects': 'Projects',
            'menu.about': 'About',
            'menu.people': 'People',
            'menu.contact': 'Contact',

            'project.back': 'Back',
            'project.meta.location': 'Location',
            'project.meta.year': 'Completed',
            'project.meta.awards': 'Awards',

            'about.hero': 'About',
            'about.founder': 'Founder',
            'about.founder.name': 'VO TRONG NGHIA',
            'about.founder.photoAlt': 'Architect Vo Trong Nghia',
            'about.founder.title': 'Founder',
            'about.founder.bio': 'Vo Trong Nghia was born in 1976 and graduated from the University of Tokyo. He is a pioneer of the "Greening the City" movement in Vietnam, with a philosophy of using bamboo as "the green steel of the 21st century." His works harmoniously combine modern architecture with nature, creating sustainable living spaces.',
            'about.founder.awardsLabel': 'Selected Awards',
            'about.profile': 'Profile',
            'about.partners': 'People',
            'about.contacts': 'Contacts',
            'about.imageAlt': 'VTN Philosophy',

            'about.profile.lead': 'VTN Architects (Vo Trong Nghia Architects) was founded in 2006 and is among Vietnam\'s leading architecture firms, with offices in Ho Chi Minh City and Hanoi.',
            'about.profile.p1': 'We believe architecture can create positive change for society and the environment. By combining traditional materials with contemporary techniques, VTN Architects pursues green, sustainable spaces that reconnect people with nature.',
            'about.profile.p2': 'Our work has received international awards and recognition for both creativity and social responsibility.',

            'about.group.architects': 'ARCHITECTS — HO CHI MINH CITY',
            'about.group.admin': 'ADMINISTRATION — HO CHI MINH CITY',
            'about.group.hanoi': 'HANOI OFFICE',
            'about.role.chairman': 'Chairman',
            'about.role.architect': 'Architect',
            'about.role.chiefAccountant': 'Chief Accountant',
            'about.role.accountant': 'Accountant',
            'about.role.adminStaff': 'Admin',
            'about.role.directorHanoi': 'Director',
            'about.office.hcm': 'HO CHI MINH CITY',
            'about.office.hq': 'HO CHI MINH CITY',
            'about.office.hanoi': 'HANOI CITY',
            'about.partner.photoAlt': 'Partner',

            // People names (English without diacritics, uppercase)
            'people.nguyen-van-tung': 'NGUYEN VAN TUNG',
            'people.manh-trong-danh': 'MANH TRONG DANH',
            'people.nguyen-hoang-da': 'NGUYEN HOANG DA',
            'people.nguyen-hoang-huy': 'NGUYEN HOANG HUY',
            'people.tran-nguyen-quoc-vuong': 'TRAN NGUYEN QUOC VUONG',
            'people.pham-van-hoang': 'PHAM VAN HOANG',
            'people.vo-thi-thao-uyen': 'VO THI THAO UYEN',
            'people.nguyen-huu-tin': 'NGUYEN HUU TIN',
            'people.le-phan-hoang-kim': 'LE PHAN HOANG KIM',
            'people.pham-nhut-anh-khoa': 'PHAM NHUT ANH KHOA',
            'people.nguyen-phuc-quang': 'NGUYEN PHUC QUANG',
            'people.nguyen-manh-toan': 'NGUYEN MANH TOAN',
            'people.tran-minh-luan': 'TRAN MINH LUAN',
            'people.duong-quang-dat': 'DUONG QUANG DAT',
            'people.tran-minh-quang': 'TRAN MINH QUANG',
            'people.dang-ngoc-kim-ngan': 'DANG NGOC KIM NGAN',
            'people.pham-vu-thien-my': 'PHAM VU THIEN MY',
            'people.ha-thi-my-quyen': 'HA THI MY QUYEN',
            'people.tran-my-tien': 'TRAN MY TIEN',
            'people.tu-minh-dong': 'TU MINH DONG',
            'people.duong-son-tung': 'DUONG SON TUNG',
            'people.tran-thi-huyen-trang': 'TRAN THI HUYEN TRANG',
            'people.tran-khoa-hoang': 'TRAN KHOA HOANG',
            'people.doan-hai-dang': 'DOAN HAI DANG',
            'people.trinh-khanh-duy': 'TRINH KHANH DUY',
            'people.do-huyen-anh': 'DO HUYEN ANH',
            'people.nguyen-thi-kim-hoan': 'NGUYEN THI KIM HOAN',
            'people.hoverToView': 'Hover to view',

            // Roles (English)
            'role.architect': 'Architect',
            'role.chiefAccountant': 'Chief Accountant',
            'role.accountant': 'Accountant',
            'role.directorHanoi': 'Director',
            'role.hrAdmin': 'HR & Admin',

            'contact.hqOffice': 'HEADQUARTERS',
            'contact.hanoiOffice': 'REPRESENTATIVE OFFICE',
            'contact.tel': 'Tel',
            'contact.viewMap': 'View Map',
            'contact.generalInquiries': 'General Inquiries',
            'contact.email': 'Email',
            'contact.press': 'Press',
            'contact.careers': 'Careers',
            'contact.lectures': 'Lectures',

            'loader.progressText': 'Loading experience',
            'loader.loadingAssets': 'Loading assets',
            'loader.almostThere': 'Almost there',
            'loader.ready': 'Ready',
            'loader.hint': 'Sustainable Architecture',
            'loader.tagline.architects': 'Architects',
            'loader.tagline.green': 'Green',
            'loader.tagline.bamboo': 'Bamboo',

            'lightbox.zoomedImageAlt': 'Zoomed image',
            'lightbox.close': 'Close',
            'lightbox.prev': 'Previous image',
            'lightbox.next': 'Next image',

            'view.list': 'List',
            'view.space': 'Space',
            'view.3d': '3D',
            'view.grid': 'Grid',


            'filter.all': 'All',
            'filter.hcm': 'Ho Chi Minh City',
            'filter.hanoi': 'Hanoi',
        },
    };

    function normalizeLang(lang) {
        if (!lang) return null;
        const lower = String(lang).toLowerCase();
        if (!SUPPORTED.includes(lower)) return null;
        return lower;
    }

    function getLangFromQuery() {
        const params = new URLSearchParams(window.location.search);
        return normalizeLang(params.get('lang'));
    }

    function getStoredLang() {
        try {
            return normalizeLang(localStorage.getItem(STORAGE_KEY));
        } catch {
            return null;
        }
    }

    function getInitialLang() {
        return getLangFromQuery()
            || getStoredLang()
            || normalizeLang(document.documentElement.lang)
            || 'en';
    }

    function t(lang, key) {
        const byLang = DICT[lang] || {};
        return byLang[key] ?? DICT.en[key] ?? key;
    }

    function applyI18n(root = document) {
        const lang = window.vtnGetLang();

        root.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;
            el.textContent = t(lang, key);
        });

        root.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.getAttribute('data-i18n-html');
            if (!key) return;
            el.innerHTML = t(lang, key);
        });

        root.querySelectorAll('[data-i18n-alt]').forEach((el) => {
            const key = el.getAttribute('data-i18n-alt');
            if (!key) return;
            el.setAttribute('alt', t(lang, key));
        });

        root.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
            const key = el.getAttribute('data-i18n-aria-label');
            if (!key) return;
            el.setAttribute('aria-label', t(lang, key));
        });

        const titleKey = document.body && document.body.getAttribute('data-i18n-title');
        if (titleKey) document.title = t(lang, titleKey);
    }

    function updateToggleButtons() {
        const lang = window.vtnGetLang();
        const next = lang === 'vi' ? 'en' : 'vi';
        const ariaKey = next === 'en' ? 'lang.switchToEn' : 'lang.switchToVi';

        document.querySelectorAll('.lang-toggle').forEach((btn) => {
            btn.textContent = next.toUpperCase();
            btn.setAttribute('aria-label', t(lang, ariaKey));
        });
    }

    function setLang(nextLang) {
        const lang = normalizeLang(nextLang);
        if (!lang) return;

        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch { }

        document.documentElement.lang = lang;
        applyI18n(document);
        updateToggleButtons();
        document.dispatchEvent(new CustomEvent('vtn:lang', { detail: { lang } }));
    }

    window.vtnGetLang = () => normalizeLang(document.documentElement.lang) || 'en';
    window.vtnSetLang = setLang;
    window.vtnT = (key) => t(window.vtnGetLang(), key);
    window.vtnApplyI18n = applyI18n;

    document.addEventListener('DOMContentLoaded', () => {
        setLang(getInitialLang());

        document.querySelectorAll('.lang-toggle').forEach((btn) => {
            btn.addEventListener('click', () => {
                setLang(window.vtnGetLang() === 'vi' ? 'en' : 'vi');
            });
        });

        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                m.addedNodes.forEach((node) => {
                    if (node.nodeType !== 1) return; // ELEMENT_NODE
                    applyI18n(node);
                    updateToggleButtons();
                });
            }
        });

        if (document.body) observer.observe(document.body, { childList: true, subtree: true });
    });
})();
