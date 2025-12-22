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
            'about.profile': 'Hồ sơ',
            'about.partners': 'Nhân sự',
            'about.contacts': 'Liên hệ',
            'about.imageAlt': 'Triết lý VTN',

            'about.profile.lead': 'VTN Architects (Võ Trọng Nghĩa Architects) được thành lập năm 2006, là một trong những văn phòng kiến trúc hàng đầu tại Việt Nam với các văn phòng tại TP. Hồ Chí Minh và Hà Nội.',
            'about.profile.p1': 'Chúng tôi tin rằng kiến trúc có thể tạo ra những thay đổi tích cực cho xã hội và môi trường. Bằng việc kết hợp vật liệu truyền thống với kỹ thuật hiện đại, VTN Architects hướng đến những không gian sống xanh, bền vững và gắn kết với thiên nhiên.',
            'about.profile.p2': 'Các công trình của chúng tôi đã nhận được nhiều giải thưởng quốc tế và được giới chuyên môn đánh giá cao về tính sáng tạo cũng như trách nhiệm với cộng đồng.',

            'about.role.chairman': 'Chủ tịch',
            'about.role.architect': 'Kiến trúc sư',
            'about.role.chiefAccountant': 'Kế toán trưởng',
            'about.role.accountant': 'Kế toán',
            'about.role.adminStaff': 'Nhân viên hành chính',
            'about.role.directorHanoi': 'Giám đốc văn phòng Hà Nội',
            'about.office.hq': 'Văn phòng chính (TP. Hồ Chí Minh)',
            'about.office.hanoi': 'Văn phòng đại diện (Hà Nội)',
            'about.partner.photoAlt': 'Đối tác',

            'contact.saigonOffice': 'Văn phòng Sài Gòn',
            'contact.hanoiOffice': 'Văn phòng Hà Nội',
            'contact.generalInquiries': 'Liên hệ chung',
            'contact.tel': 'Điện thoại',
            'contact.email': 'Email',
            'contact.press': 'Báo chí',
            'contact.careers': 'Tuyển dụng',
            'contact.lectures': 'Hội thảo',

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
            'about.profile': 'Profile',
            'about.partners': 'People',
            'about.contacts': 'Contacts',
            'about.imageAlt': 'VTN Philosophy',

            'about.profile.lead': 'VTN Architects (Vo Trong Nghia Architects) was founded in 2006 and is among Vietnam’s leading architecture firms, with offices in Ho Chi Minh City and Hanoi.',
            'about.profile.p1': 'We believe architecture can create positive change for society and the environment. By combining traditional materials with contemporary techniques, VTN Architects pursues green, sustainable spaces that reconnect people with nature.',
            'about.profile.p2': 'Our work has received international awards and recognition for both creativity and social responsibility.',

            'about.role.chairman': 'Chairman',
            'about.role.architect': 'Architect',
            'about.role.chiefAccountant': 'Chief Accountant',
            'about.role.accountant': 'Accountant',
            'about.role.adminStaff': 'Admin staff',
            'about.role.directorHanoi': 'Director of Hanoi office',
            'about.office.hq': 'EMPLOYEES AT HQ (HO CHI MINH)',
            'about.office.hanoi': 'EMPLOYEES AT REPRESENTATIVE OFFICE (HANOI)',
            'about.partner.photoAlt': 'Partner',

            'contact.saigonOffice': 'Saigon Office',
            'contact.hanoiOffice': 'Hanoi Office',
            'contact.generalInquiries': 'General Inquiries',
            'contact.tel': 'Tel',
            'contact.email': 'Email',
            'contact.press': 'Press',
            'contact.careers': 'Careers',
            'contact.lectures': 'Lectures',

            'loader.progressText': 'Loading experience',
            'loader.loadingAssets': 'Loading assets',
            'loader.almostThere': 'Almost there',
            'loader.ready': 'Ready',
            'loader.hint': 'Sustainable Architecture',
            'loader.tagline.architects': 'architects',
            'loader.tagline.green': 'green',
            'loader.tagline.bamboo': 'bamboo',

            'lightbox.zoomedImageAlt': 'Zoomed image',
            'lightbox.close': 'Close',
            'lightbox.prev': 'Previous image',
            'lightbox.next': 'Next image',

            'view.list': 'List',
            'view.space': 'Space',
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
