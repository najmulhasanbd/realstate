const fs = require('fs');
const path = 'c:/Users/Md Najmul Hasan/OneDrive/Desktop/builder/index.html';
let html = fs.readFileSync(path, 'utf8');

const slideHtml = `                <div class="swiper-slide project-slide">
                    <a href="#" class="d-block w-100 h-100 text-decoration-none">
                        <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Edison Iris" class="w-100 h-100 object-fit-cover">
                        <div class="project-overlay"></div>
                        <div class="project-content">
                            <h3 class="text-white fw-bold mb-1 text-uppercase">EDISON IRIS</h3>
                            <p class="text-white-50 small mb-4">Bashundhara R/A</p>
                        </div>
                    </a>
                </div>`.repeat(4);

const newProjectsSection = `    <!-- Projects Section -->
    <section id="projects" class="py-5 overflow-hidden position-relative">
        <div class="container mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
            <div>
                <h6 class="text-uppercase text-secondary fw-bold mb-2 letter-spacing-1">Our Projects</h6>
                <h2 class="fw-bold text-dark display-5 mb-0">Exclusive Developments</h2>
            </div>
            
            <ul class="nav nav-pills custom-project-tabs gap-2" id="projectTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active rounded-pill px-4" id="ongoing-tab" data-bs-toggle="tab" data-bs-target="#ongoing" type="button" role="tab" aria-selected="true">Ongoing</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill px-4" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" type="button" role="tab" aria-selected="false">Upcoming</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill px-4" id="handed-over-tab" data-bs-toggle="tab" data-bs-target="#handed-over" type="button" role="tab" aria-selected="false">Handed Over</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill px-4" id="ready-tab" data-bs-toggle="tab" data-bs-target="#ready" type="button" role="tab" aria-selected="false">Ready</button>
                </li>
            </ul>

            <!-- Custom Navigation Arrows -->
            <div class="d-none d-md-flex gap-2 ms-auto">
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

        <div class="tab-content" id="projectTabsContent">
            <!-- Ongoing Tab -->
            <div class="tab-pane fade show active" id="ongoing" role="tabpanel" aria-labelledby="ongoing-tab">
                <div class="swiper project-swiper-ongoing w-100">
                    <div class="swiper-wrapper">
${slideHtml}
                    </div>
                </div>
            </div>
            
            <!-- Upcoming Tab -->
            <div class="tab-pane fade" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">
                <div class="swiper project-swiper-upcoming w-100">
                    <div class="swiper-wrapper">
${slideHtml}
                    </div>
                </div>
            </div>
            
            <!-- Handed Over Tab -->
            <div class="tab-pane fade" id="handed-over" role="tabpanel" aria-labelledby="handed-over-tab">
                <div class="swiper project-swiper-handed-over w-100">
                    <div class="swiper-wrapper">
${slideHtml}
                    </div>
                </div>
            </div>
            
            <!-- Ready Tab -->
            <div class="tab-pane fade" id="ready" role="tabpanel" aria-labelledby="ready-tab">
                <div class="swiper project-swiper-ready w-100">
                    <div class="swiper-wrapper">
${slideHtml}
                    </div>
                </div>
            </div>
        </div>
    </section>`;

const startIdx = html.indexOf('<!-- Projects Section -->');
const endIdx = html.indexOf('<!-- Full Screen Auto Play Video Section -->');
if(startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + newProjectsSection + '\n\n    ' + html.substring(endIdx);
    fs.writeFileSync(path, html);
    console.log('Success');
} else {
    console.log('Indices not found');
}
