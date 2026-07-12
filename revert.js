const fs = require('fs');
const path = 'c:/Users/Md Najmul Hasan/OneDrive/Desktop/builder/index.html';
let html = fs.readFileSync(path, 'utf8');

const originalProjectsSection = `    <!-- Projects Section -->
    <section id="projects" class="py-5 overflow-hidden position-relative">
        <div class="container mb-4 d-flex justify-content-between align-items-end">
            <div>
                <h6 class="text-uppercase text-secondary fw-bold mb-2 letter-spacing-1">Our Projects</h6>
                <h2 class="fw-bold text-dark display-5 mb-0">Exclusive Developments</h2>
            </div>

            <!-- Custom Navigation Arrows -->
            <div class="d-none d-md-flex gap-2">
                <a href="javascript:void(0)"
                    class="project-prev btn btn-outline-dark rounded-circle d-flex justify-content-center align-items-center"
                    style="width: 50px; height: 50px;">
                    <i class="fas fa-chevron-left"></i>
                </a>
                <a href="javascript:void(0)"
                    class="project-next btn btn-outline-dark rounded-circle d-flex justify-content-center align-items-center"
                    style="width: 50px; height: 50px;">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </div>
        </div>

        <!-- Swiper Slider -->
        <div class="swiper project-swiper w-100">
            <div class="swiper-wrapper">

                <div class="swiper-slide project-slide">
                    <a href="#" class="d-block w-100 h-100 text-decoration-none">
                        <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Edison Iris" class="w-100 h-100 object-fit-cover">
                        <div class="project-overlay"></div>
                        <div class="project-content">
                            <h3 class="text-white fw-bold mb-1 text-uppercase">EDISON IRIS</h3>
                            <p class="text-white-50 small mb-4">Bashundhara R/A</p>
                        </div>
                    </a>
                </div>
                <div class="swiper-slide project-slide">
                    <a href="#" class="d-block w-100 h-100 text-decoration-none">
                        <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Edison Iris" class="w-100 h-100 object-fit-cover">
                        <div class="project-overlay"></div>
                        <div class="project-content">
                            <h3 class="text-white fw-bold mb-1 text-uppercase">EDISON IRIS</h3>
                            <p class="text-white-50 small mb-4">Bashundhara R/A</p>
                        </div>
                    </a>
                </div>

                <div class="swiper-slide project-slide">
                    <a href="#" class="d-block w-100 h-100 text-decoration-none">
                        <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Edison Iris" class="w-100 h-100 object-fit-cover">
                        <div class="project-overlay"></div>
                        <div class="project-content">
                            <h3 class="text-white fw-bold mb-1 text-uppercase">EDISON IRIS</h3>
                            <p class="text-white-50 small mb-4">Bashundhara R/A</p>
                        </div>
                    </a>
                </div>
                <div class="swiper-slide project-slide">
                    <a href="#" class="d-block w-100 h-100 text-decoration-none">
                        <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Edison Iris" class="w-100 h-100 object-fit-cover">
                        <div class="project-overlay"></div>
                        <div class="project-content">
                            <h3 class="text-white fw-bold mb-1 text-uppercase">EDISON IRIS</h3>
                            <p class="text-white-50 small mb-4">Bashundhara R/A</p>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </section>`;

const startIdx = html.indexOf('<!-- Projects Section -->');
const endIdx = html.indexOf('<!-- Full Screen Auto Play Video Section -->');
if(startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + originalProjectsSection + '\n\n    ' + html.substring(endIdx);
    fs.writeFileSync(path, html);
    console.log('Success HTML Revert');
} else {
    console.log('Indices not found for revert');
}
