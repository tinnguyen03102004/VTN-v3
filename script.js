// VTN Architects - Simple JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('.portfolio-section');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current ||
                link.getAttribute('href') === 'index.html#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Project page - Load project data based on URL parameter
    if (document.body.classList.contains('project-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        const projects = {
            // Green projects
            'house-for-trees': {
                title: 'House for Trees',
                description: 'House for Trees là một trong những công trình tiêu biểu của VTN Architects, thể hiện triết lý kiến trúc xanh. Công trình được thiết kế như những chậu cây khổng lồ, mang lại không gian sống xanh mát trong lòng thành phố. Dự án đã giành nhiều giải thưởng kiến trúc quốc tế.',
                image: 'images/modern-house.jpg',
                location: 'Ho Chi Minh City',
                year: '2014',
                area: '512 m²',
                category: 'Green Architecture'
            },
            'stacking-green': {
                title: 'Stacking Green',
                description: 'Stacking Green là ngôi nhà xanh đô thị tiêu biểu, với mặt tiền được phủ kín cây xanh. Công trình chứng minh rằng ngay cả trong điều kiện đất hẹp tại đô thị, vẫn có thể tạo ra không gian sống gần gũi thiên nhiên.',
                image: 'images/villa-aerial.jpg',
                location: 'Ho Chi Minh City',
                year: '2012',
                area: '250 m²',
                category: 'Green Architecture'
            },
            'binh-house': {
                title: 'Binh House',
                description: 'Binh House được thiết kế cho một gia đình ba thế hệ. Công trình kết hợp hài hòa giữa không gian sống và cây xanh, tạo một môi trường sống lành mạnh và thoáng mát.',
                image: 'images/japanese-house.jpg',
                location: 'Ho Chi Minh City',
                year: '2016',
                area: '700 m²',
                category: 'Green Architecture'
            },
            'farm-house': {
                title: 'Farm House',
                description: 'Farm House là mô hình nhà ở sinh thái, kết hợp chức năng canh tác và sinh sống. Công trình mang đến giải pháp bền vững cho cuộc sống đô thị hiện đại.',
                image: 'images/hotel-lobby.jpg',
                location: 'Long An',
                year: '2018',
                area: '850 m²',
                category: 'Green Architecture'
            },
            'naman-retreat': {
                title: 'Naman Retreat',
                description: 'Naman Retreat là khu nghỉ dưỡng sinh thái tại Đà Nẵng, nơi kiến trúc hòa quyện với thiên nhiên biển và rừng dương. Công trình thể hiện sự tôn trọng môi trường tự nhiên.',
                image: 'images/cafe-interior.jpg',
                location: 'Da Nang',
                year: '2015',
                area: '25,000 m²',
                category: 'Green Architecture'
            },
            'vtn-office': {
                title: 'VTN Office',
                description: 'Văn phòng VTN Architects được thiết kế như một không gian làm việc xanh, với nhiều cây xanh và ánh sáng tự nhiên. Công trình là minh chứng sống cho triết lý thiết kế của công ty.',
                image: 'images/office-building.jpg',
                location: 'Ho Chi Minh City',
                year: '2019',
                area: '300 m²',
                category: 'Green Architecture'
            },
            // Bamboo projects
            'bamboo-wing': {
                title: 'Bamboo Wing',
                description: 'Bamboo Wing là công trình sử dụng tre làm vật liệu chính, với thiết kế mô phỏng đôi cánh chim. Công trình chứng minh khả năng ứng dụng tre trong kiến trúc quy mô lớn.',
                image: 'images/cafe-interior.jpg',
                location: 'Vinh Phuc',
                year: '2010',
                area: '1,200 m²',
                category: 'Bamboo Architecture'
            },
            'kontum-indochine': {
                title: 'Kontum Indochine',
                description: 'Kontum Indochine Café là công trình tre biểu tượng với kết cấu mái vòm tre độc đáo. Công trình đã đạt nhiều giải thưởng kiến trúc quốc tế và trở thành biểu tượng của kiến trúc tre Việt Nam.',
                image: 'images/hotel-lobby.jpg',
                location: 'Kon Tum',
                year: '2013',
                area: '800 m²',
                category: 'Bamboo Architecture'
            },
            'son-la-restaurant': {
                title: 'Sơn La Restaurant',
                description: 'Nhà hàng Sơn La sử dụng tre và vật liệu địa phương, tạo nên không gian ẩm thực độc đáo giữa núi rừng Tây Bắc. Công trình thể hiện sự kết hợp giữa kỹ thuật hiện đại và vật liệu truyền thống.',
                image: 'images/japanese-house.jpg',
                location: 'Son La',
                year: '2014',
                area: '600 m²',
                category: 'Bamboo Architecture'
            },
            'wne-restaurant': {
                title: 'WNE Restaurant',
                description: 'WNE Restaurant với kết cấu tre uốn cong tự nhiên, tạo không gian ấm cúng và thân thiện với môi trường. Công trình là điểm đến ẩm thực và kiến trúc hấp dẫn.',
                image: 'images/villa-aerial.jpg',
                location: 'Binh Duong',
                year: '2016',
                area: '450 m²',
                category: 'Bamboo Architecture'
            },
            'bamboo-dome': {
                title: 'Bamboo Dome',
                description: 'Bamboo Dome là công trình mái vòm tre với quy mô lớn, thể hiện khả năng vượt nhịp ấn tượng của vật liệu tre. Công trình được sử dụng cho các sự kiện và hội nghị.',
                image: 'images/modern-house.jpg',
                location: 'An Giang',
                year: '2017',
                area: '2,500 m²',
                category: 'Bamboo Architecture'
            },
            'vedana-resort': {
                title: 'Vedana Resort',
                description: 'Vedana Resort là khu nghỉ dưỡng sử dụng tre và vật liệu tự nhiên, nằm giữa thiên nhiên hoang sơ. Công trình mang lại trải nghiệm nghỉ dưỡng gần gũi với thiên nhiên.',
                image: 'images/office-building.jpg',
                location: 'Ninh Binh',
                year: '2019',
                area: '15,000 m²',
                category: 'Bamboo Architecture'
            }
        };

        if (projectId && projects[projectId]) {
            const project = projects[projectId];

            document.title = project.title + ' - VTN Architects';
            document.getElementById('project-title').textContent = project.title;
            document.getElementById('project-description').textContent = project.description;
            document.getElementById('project-image').src = project.image;
            document.getElementById('project-image').alt = project.title;
            document.getElementById('project-location').textContent = project.location;
            document.getElementById('project-year').textContent = project.year;
            document.getElementById('project-area').textContent = project.area;
            document.getElementById('project-category').textContent = project.category;
        }
    }
});
